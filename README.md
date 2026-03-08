# About-Lamaglama39
まわせいぃ！  
アルパカをまわせいぃ！！

[about.lamaglama39.dev](https://about.lamaglama39.dev/)

![app-image](public/apps/lamaglama39.png)

## 使用技術
| Category          | Technology Stack                             |
| ----------------- | ---------------------------------------------|
| Frontend          | React, React Router v7, vite, Three.js       |
| Backend           | Node.js                                      |
| Infrastructure    | Cloudflare Workers                           |
| Design            | Figma                                        |

## ディレクトリ構成

```
.
├── app/                           # アプリケーション本体
│   ├── components/                # UIコンポーネント
│   │   ├── NavBar.tsx             #   ナビゲーションバー
│   │   ├── AppCard.tsx            #   アプリ紹介カード
│   │   ├── AppGrid.tsx            #   アプリ一覧グリッド
│   │   ├── CareerItem.tsx         #   職歴表示(展開式)
│   │   ├── SkillSection.tsx       #   スキルセクション
│   │   ├── SkillIcon.tsx          #   スキルアイコン
│   │   ├── ContactSection.tsx     #   連絡先セクション
│   │   ├── ContactIcon.tsx        #   連絡先アイコン
│   │   ├── DMarkIcon.tsx          #   DevelopersIOアイコン
│   │   └── EmojiLinkFavicon.tsx   #   絵文字ファビコン
│   ├── routes/                    # ページルート
│   │   ├── alpaca.tsx             #   トップページ(3Dアルパカビューワー)
│   │   ├── home.tsx               #   ホーム(自己紹介/スキル/職歴)
│   │   ├── blog.tsx               #   ブログ記事一覧(Zenn/Qiita/DevelopersIO)
│   │   ├── apps.tsx               #   制作アプリ一覧
│   │   ├── profile.tsx            #   プロフィール詳細
│   │   └── $.tsx                  #   404ページ
│   ├── data/                      # 静的データ定義
│   │   ├── profileData.ts         #   プロフィール/職歴/スキル/連絡先
│   │   ├── apps.ts                #   制作アプリ情報
│   │   └── lightPresets.ts        #   3Dライティングプリセット(10種類)
│   ├── utils/                     # ユーティリティ
│   │   ├── blogCache.ts           #   ブログキャッシュ(localStorage/5分TTL)
│   │   └── emojiToDataUrl.ts      #   絵文字をData URLに変換
│   ├── root.tsx                   # ルートレイアウト
│   ├── entry.server.tsx           # SSRエントリーポイント
│   ├── routes.ts                  # ルート定義
│   └── app.css                    # グローバルスタイル(Tailwind CSS)
├── workers/
│   ├── app.ts                     # Cloudflare Workersエントリー(Cron Trigger含む)
│   └── blogFetcher.ts             # ブログ記事取得+KVキャッシュ管理
├── public/                        # 静的ファイル
│   ├── model/                     #   3Dモデル(GLB形式)
│   └── apps/                      #   アプリ紹介画像
├── package.json                   # 依存パッケージ/スクリプト定義
├── vite.config.ts                 # Viteビルド設定(Dracoコピー含む)
├── react-router.config.ts         # React Router設定(SSR有効)
├── wrangler.jsonc                 # Cloudflare Workers設定(ドメイン/ルーティング)
├── tsconfig.json                  # TypeScript設定
├── tsconfig.cloudflare.json       # Cloudflare用TypeScript設定
├── tsconfig.node.json             # Node.js用TypeScript設定
└── .npmrc                         # npm設定(min-release-age等)
```

### 更新時作業

| やりたいこと | 編集するファイル |
|-------------|----------------|
| プロフィール/職歴/スキルの更新 | `app/data/profileData.ts` |
| 制作アプリの追加/編集 | `app/data/apps.ts` + `public/apps/`に画像追加 |
| ブログ取得元の変更 | `workers/blogFetcher.ts` |
| 3Dモデルの変更 | `public/model/`にGLBファイル配置 + `app/routes/alpaca.tsx` |
| ライティングプリセットの追加 | `app/data/lightPresets.ts` |
| ページの追加 | `app/routes/`にファイル追加 + `app/routes.ts`にルート追加 |
| UIコンポーネントの追加 | `app/components/`にファイル追加 |
| グローバルスタイルの変更 | `app/app.css` |
| デプロイ先の変更 | `wrangler.jsonc` |
| ビルド設定の変更 | `vite.config.ts` |

## セットアップ

依存パッケージをインストール

```bash
npm install
```

### セキュリティチェック

インストール後、脆弱性がないか確認

```bash
# 既知の脆弱性をチェック
npm audit

# 修正可能な脆弱性を自動修正
npm audit fix
```

`.npmrc`で`min-release-age=21`を設定しており、公開から21日未満のパッケージはインストールされない。

## 開発

開発サーバーを起動

```bash
npm run dev
```

`http://localhost:5173` でアクセス可能。

## ビルド

本番ビルドを作成

```bash
npm run build
```

## プレビュー

本番ビルドをローカルで確認

```bash
npm run preview
```

## デプロイ

Cloudflare Workersへのデプロイは[Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/)を使用する。

### 初回セットアップ

初回のみCloudflareへのログインが必要

```bash
npm run login
```

ブラウザが開くのでCloudflareアカウントで認証する。

### デプロイ前の確認

ビルドとデプロイの検証を実際のデプロイなしで実行

```bash
npm run deploy:check
```

### 本番デプロイ

ビルドと本番環境へのデプロイを一括実行

```bash
npm run deploy
```

### プレビューURLデプロイ

本番反映前にプレビューURLで動作確認する場合

```bash
# プレビューバージョンをアップロード
npx wrangler versions upload

# 確認後、本番に昇格（段階的ロールアウトも可能）
npx wrangler versions deploy
```
