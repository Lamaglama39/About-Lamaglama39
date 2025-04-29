/**
 * Cloudflare Worker for fetching blog posts from Zenn and Qiita
 * This worker helps to avoid CORS issues when fetching from external APIs
 */

interface ArticleSource {
  id: number;
  title: string;
  url: string;
  excerpt: string;
  date: string;
  tags: string[];
  source: string;
}

export interface Env {
  // Cloudflare環境変数があれば追加
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    // CORSヘッダーを設定
    const headers = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Content-Type': 'application/json'
    };

    // OPTIONSリクエストに対応
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers });
    }

    const url = new URL(request.url);
    
    // ヘルスチェックエンドポイントを追加
    if (url.pathname === '/health' || url.pathname === '/') {
      return new Response(JSON.stringify({ status: 'ok' }), { 
        headers,
        status: 200 
      });
    }
    
    // API エンドポイント（メインワーカーからの呼び出し用）
    if (url.pathname === '/api') {
      try {
        // ZennとQiitaの両方の記事を並行して取得
        const [zennArticles, qiitaArticles] = await Promise.all([
          fetchZennArticles(),
          fetchQiitaArticles()
        ]);

        // 記事を日付順にソート
        const articles = [...zennArticles, ...qiitaArticles].sort((a, b) => {
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        });

        // 結果を返却
        return new Response(JSON.stringify({ articles }), { headers });
      } catch (error) {
        console.error('Error fetching articles:', error);
        return new Response(
          JSON.stringify({ 
            error: '記事の取得に失敗しました',
            articles: await getFallbackArticles() 
          }),
          { 
            status: 500,
            headers 
          }
        );
      }
    }
    
    // その他のエンドポイントには404を返す
    return new Response(JSON.stringify({ error: 'Not found' }), { 
      status: 404,
      headers
    });
  }
};

/**
 * ZennのRSSフィードから記事を取得する関数
 */
async function fetchZennArticles(): Promise<ArticleSource[]> {
  try {
    const response = await fetch('https://zenn.dev/lamaglama39/feed');
    if (!response.ok) {
      throw new Error('Failed to fetch Zenn articles');
    }

    const text = await response.text();
    
    // XMLをパース（WorkerではDOMParserが使用できないため文字列操作でパース）
    const articles: ArticleSource[] = [];
    const itemRegex = /<item>([\s\S]*?)<\/item>/g;
    const titleRegex = /<title>([\s\S]*?)<\/title>/;
    const linkRegex = /<link>([\s\S]*?)<\/link>/;
    const descriptionRegex = /<description>([\s\S]*?)<\/description>/;
    const pubDateRegex = /<pubDate>([\s\S]*?)<\/pubDate>/;
    const categoryRegex = /<category>([\s\S]*?)<\/category>/g;

    let match;
    let id = 1;
    while ((match = itemRegex.exec(text)) !== null) {
      const item = match[1];
      
      // 各要素を抽出
      const titleMatch = item.match(titleRegex);
      const linkMatch = item.match(linkRegex);
      const descriptionMatch = item.match(descriptionRegex);
      const pubDateMatch = item.match(pubDateRegex);
      
      // カテゴリ（タグ）を抽出
      const tags: string[] = [];
      let categoryMatch;
      while ((categoryMatch = categoryRegex.exec(item)) !== null) {
        tags.push(categoryMatch[1]);
      }

      if (titleMatch && linkMatch && pubDateMatch) {
        const title = titleMatch[1];
        const url = linkMatch[1];
        const pubDate = pubDateMatch[1];
        const description = descriptionMatch ? descriptionMatch[1] : '';

        // HTML文字列からプレーンテキストを抽出
        const excerpt = description
          .replace(/<[^>]*>/g, '')  // HTMLタグを削除
          .substring(0, 150) + '...';  // 150文字に制限

        // 日付をフォーマット
        const date = new Date(pubDate);
        const formattedDate = date.toISOString().split('T')[0];

        articles.push({
          id: id++,
          title,
          url,
          excerpt,
          date: formattedDate,
          tags: tags.length > 0 ? tags : ['技術記事'],
          source: 'Zenn'
        });
      }
    }

    return articles;
  } catch (error) {
    console.error('Error fetching Zenn articles:', error);
    return [];
  }
}

/**
 * QiitaのAPIから記事を取得する関数
 */
async function fetchQiitaArticles(): Promise<ArticleSource[]> {
  try {
    const response = await fetch('https://qiita.com/api/v2/users/lamaglama39/items');
    if (!response.ok) {
      throw new Error('Failed to fetch Qiita articles');
    }

    const items = await response.json() as Array<{
      title: string;
      url: string;
      body: string;
      created_at: string;
      tags: Array<{ name: string }>;
    }>;
    
    let id = 1000; // Zennの記事とIDが被らないようにする

    return items.map((item) => ({
      id: id++,
      title: item.title,
      url: item.url,
      excerpt: item.body.substring(0, 150).replace(/\r?\n/g, ' ') + '...',
      date: item.created_at.split('T')[0],
      tags: item.tags.map(tag => tag.name),
      source: 'Qiita'
    }));
  } catch (error) {
    console.error('Error fetching Qiita articles:', error);
    return [];
  }
}

/**
 * フォールバック用の記事データ
 */
async function getFallbackArticles(): Promise<ArticleSource[]> {
  return [
    {
      id: 1,
      title: "React Router v7の新機能について",
      date: "2023-06-15",
      excerpt: "React Router v7で導入された新機能と変更点を解説します。",
      tags: ["React", "フロントエンド", "ルーティング"],
      url: "https://zenn.dev/lamaglama39/articles/react-router-v7",
      source: "Zenn"
    },
    {
      id: 2,
      title: "CloudflareとRemixでサーバーレスWebアプリを構築する",
      date: "2023-05-20",
      excerpt: "CloudflareワーカーとRemixを使用して高速なWeb体験を実現する方法について解説します。",
      tags: ["Cloudflare", "Remix", "サーバーレス"],
      url: "https://zenn.dev/lamaglama39/articles/cloudflare-remix",
      source: "Zenn"
    },
    {
      id: 3,
      title: "GitHub ActionsでCI/CDパイプラインを自動化する",
      date: "2023-04-10", 
      excerpt: "GitHub Actionsを使用してCI/CDパイプラインを構築し、デプロイを自動化する方法を紹介します。",
      tags: ["GitHub", "CI/CD", "DevOps"],
      url: "https://zenn.dev/lamaglama39/articles/github-actions-cicd",
      source: "Zenn"
    },
    {
      id: 4,
      title: "Terraformを使用したインフラのコード化",
      date: "2023-03-05",
      excerpt: "Terraformを使用してAWSインフラをコード化し、再現性のある環境を構築する方法を解説します。",
      tags: ["Terraform", "AWS", "IaC"],
      url: "https://zenn.dev/lamaglama39/articles/terraform-aws",
      source: "Zenn"
    },
    {
      id: 5,
      title: "Next.js 14の新機能と移行方法",
      date: "2023-10-28",
      excerpt: "Next.js 14で導入された新機能とアプリケーションの移行方法について解説します。",
      tags: ["Next.js", "React", "Web開発"],
      url: "https://qiita.com/lamaglama39/items/nextjs-14-features",
      source: "Qiita"
    }
  ];
} 