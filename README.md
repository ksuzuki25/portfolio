# ポートフォリオ

- AWS 上にデプロイすることを想定した、サーバーレスアーキテクチャで動作する認証機能付きの Todo アプリ
- ユーザーの認証及びユーザー管理に Cognito を使用
- バックエンド、フロントエンドともに Javascript（Node.js、Typescript）

## フォルダ説明

- back
  - バックエンド API
  - Node.js + express.js + API Gateway + Lambda
  - サーバーレスフレームワークに AWS SAM を使用
  - DB に DynamoDB を使用
  - SAM による Lambda 周りのテンプレートを含む
- front
  - フロントエンドアプリケーション
  - Next.js + CloudFront + S3
  - SSG+CSR
  - CloudFront、S3 関連のテンプレートを含む
- env
  - ローカル開発時に使用する Docker 環境
  - オーケストレーションツールに docker-compose を使用
  - Cognito は AWS 上にユーザープール作成必須
