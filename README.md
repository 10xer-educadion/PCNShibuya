# PCNShibuya

PCNShibuyaは、Astro、TypeScript、Tailwind CSSを使用して構築されたモダンなウェブプロジェクトです。再利用可能なReactコンポーネントを備えたモジュラーアーキテクチャを採用し、クリーンで保守しやすいコードを重視しています。

## プロジェクト構成

- `src/` - コンポーネント、モジュール、スタイル、ページなどのソースコード。
- `public/` - 画像、フォント、アイコンなどの静的アセット。
- `package.json` - プロジェクトの依存関係とスクリプト。
- `astro.config.mjs` - Astroの設定ファイル。
- `tailwind.config.mjs` - Tailwind CSSの設定ファイル。
- `tsconfig.json` - TypeScriptの設定ファイル。

## 開発

開発サーバーを起動するには、以下のコマンドを実行してください。

```bash
pnpm install
pnpm run dev
```

これにより、ホットモジュールリプレースメント対応のAstro開発サーバーが起動します。

## ビルド

本番用にビルドするには、以下のコマンドを実行してください。

```bash
pnpm run build
```

ビルド成果物は`dist/`ディレクトリに出力されます。

## デプロイ

本プロジェクトはNetlifyへのデプロイ設定がされています。設定内容は`netlify.toml`ファイルに記載されています。

## ライセンス

本プロジェクトはMITライセンスのもとで公開されています。詳細は[LICENSE](LICENSE)ファイルをご覧ください。
