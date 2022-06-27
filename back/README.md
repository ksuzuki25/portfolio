# 認証付き Todo リストアプリ（バックエンド）

## 概要

- AWS Cognito を使用したログイン機能付きの Todo アプリのバックエンド側（API）

## プロジェクト仕様

- サーバーレスフレームワーク
  - SAM
- API バックエンドフレームワーク
  - express.js
- API ランタイム言語
  - Node.js v16
  - TypeScript

## ビルド手順

- 本プロジェクトは sam の build と node アプリの build どちらも実施が必要
- 開発用の専用ローカル開発環境（※以下 Docker 環境）を使用している場合、SAM 側の build は開発環境の方で実施しているため不要
  - Docker 環境を使用しない場合は下記手順の前に`sam build`を実行すること
- node アプリのビルドは開発用の Docker コンテナにサインインした状態で行うこと
  - Docker 環境を使用しない場合はパッケージマネージャに`yarn`を使用して下記の手順を行うこと

1. cd app
2. yarn install
3. yarn build

## 開発の手順

1. Docker 環境なしの場合はビルド手順に沿ってビルドまで実施
   - モジュールを追加した場合（package.json を更新した場合）は、sam の build を再実行する
   - Docker 環境がある場合はコンテナを restart する（ビルドと起動が行われる）
2. sam をローカル実行起動
   - Docker 開発環境有）docker-compose でコンテナを立ち上げる
   - Docker 開発環境無） sam local start-api --host=0.0.0.0 --port={任意のポート}
3. node アプリの build を実施（変更監視）
   - yarn build:watch (npm run build:watch)
   - ソースを追加した場合は一旦終了して再度 `yarn build:watch` する
   - Docker 環境で実行する場合若干初回のみ時間がかかるため注意
   - ※パッケージの追加などを行った場合は docker 環境を立ち上げ直すこと
   - ※watch 実行時、.env の更新は即時反映されないため、一度 watch を止めて build するか、ts のソースを変更すると連動して反映される
4. コードを作成
5. 作成が終わったら必要に応じて Lint を実行
6. テストコードを作成したらテストを実行

## コードの整形

- app ディレクトリ以下のコード開発のため、各種フォーマッターの設定を導入しています
- ※フォーマッターによるフォーマットを受けるためには、本プロジェクトの app ディレクトリをルートとして VSCode を開いてください
- eslint と prettier によるコード整形ルールの適用を実施（※VSCode 前提）
- VSCode に下記プラグインをインストール
  - <https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint>
  - <https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode>
- setting.json に下記の`editor.defaultFormatter`以下を追加する

  - ※ユーザー設定に追加するかプロジェクトごとに設定するかは任意

  ```json
  {
    "その他設定があればその下に記載": "",
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "editor.formatOnPaste": true,
    "editor.formatOnSave": true,
    "editor.formatOnType": true,
    "editor.codeActionsOnSave": [
      "source.organizeImports",
      "source.fixAll.eslint"
    ]
  }
  ```

## Unit テストの実行

- コードを作成し、Unit テストのコードを作成したらテストを実施すること
- `yarn test` でテストを実行可能
  - app/html-report にレポートが出力される

## その他

### DynamoDB local への接続方法

[参考](https://maku.blog/p/5mv5dkt/)

- SDK v3 を想定
  - endpoint のホストを Docker 環境の DynamoDB ローカルのホスト名に合わせる
  - credentials の accessKeyId、secretAccessKey は適当な値

### ビルド周りの構成の説明について

前提：Typescript 構成に対応するため、SAM のビルド以外に TS のビルドを実施

```text
/
├── .aws-sam      # SAMの作業ディレクトリ
|                 # SAMが行ったビルド結果がここに展開される
|                 # ローカル実行されるソースはこのディレクトリのソース
|
├── dist          # デプロイに使用されるリソース
|    ├── function # /appのコンパイル結果（JS）
|    └── layer    # layer化するnode_modulesの元となるpackage.jsonとlockファイル
└── app           # APIのコード（Typescript）
```

- `/app/package.json` に従い、`/sam-tsconfig.json` に沿って `/dist` に アプリを `function` 、package.json および package-json.lock ファイルを `layer` に配置
- `/dist` のファイルを用いて、デプロイ、ローカル実行を実施
- 【ローカルの場合】
  - docker 環境立ち上げ時に、`SAM` が `/dist/function` 、 `/dist/layer` を用いて、`.aws-sam/` にビルド結果を展開
    - `.aws-sam/` 以下のソースがローカル実行時の本体となるため、ここを更新していく必要あり
  - 開発時の `yarn build` 、 `yarn build:watch` は `/dist/function` にアプリのビルド結果を生成し、同フォルダに `.env` を複製する
  - さらに、 `/dist/function` のビルド結果を VPC の内外の API 用のディレクトリに複製することで、環境の立ち上げ直しなどを回避した即時反映を実現している
  - ※ただし、 `/dist/layer` の更新の反映は、 `SAM` 側のビルド実行が必要なので、環境を立ち上げ直して対応する
