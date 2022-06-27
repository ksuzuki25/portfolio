# 認証付き Todo リストアプリ（フロント）

## 概要

- AWS Cognito を使用したログイン機能付きの Todo アプリのフロント側

## 機能

- ユーザー登録
- ログイン
- ログインユーザー毎の TodoList

## フォルダ構成

- html-report
  - jest のレポート出力先
- public
  - public リソース
- src
  - アプリケーション本体
- template
  - CloudFormation テンプレート

## 開発手順

- .env.example を複製して.env.local を作成
- Cognito のユーザープールに関する設定を行う
- `yarn dev` でローカルサーバーを起動し開発を実施
- `yarn generate` で静的なファイルを生成
  - S3 などにアップロードしてホスティング
