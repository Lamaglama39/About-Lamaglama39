/**
 * Main entry point for the Cloudflare Worker app
 */

import { createRequestHandler } from "react-router";

declare module "react-router" {
  export interface AppLoadContext {
    cloudflare: {
      env: Env;
      ctx: ExecutionContext;
    };
  }
}

// ブログフェッチャーのサービスバインディング型定義
interface Env {
  // サービスバインディング
  BLOG_FETCHER?: Fetcher;
  // 環境変数
  BLOG_FETCHER_URL: string;
  VALUE_FROM_CLOUDFLARE: string;
}

interface Fetcher {
  fetch: typeof fetch;
}

// フォールバック用のデモ記事
function getDemoArticles() {
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

const requestHandler = createRequestHandler(
  () => import("virtual:react-router/server-build"),
  import.meta.env.MODE
);

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);
    
    // ブログデータのリクエストを処理
    if (url.pathname.endsWith('/blog.data')) {
      // 常にデモ記事を返すようにシンプル化
      const data = {
        articles: getDemoArticles(),
        error: null
      };
      
      return new Response(JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type'
        }
      });
    }
    
    // 通常のリクエストは React Router のハンドラに渡す
    return requestHandler(request, {
      cloudflare: { env, ctx },
    });
  },
} satisfies ExportedHandler<Env>;
