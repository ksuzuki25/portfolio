# 認証付き Todo リストアプリ（ローカル開発環境）

- 本リポジトリはバックエンド側に SAM を利用したサーバーレスアプリケーションの開発環境
- 本環境を使用する個で、SAM や Node.js をローカルにマシンに直接インストールする必要が無い

## 最重要事項

- SAM の Host 環境（sam local start-api を実行する環境）について
  - 実行するコードの配置は Docker ホストとコンテナで必ず同一でなければならない
  - Docker コンテナ上で立ち上げる Lambda 用のコンテナの実行に Docker ホストで実行している Docker デーモンを使用するため、マウントするソースが Docker ホスト上のソースとなることが理由

## コンテナ構成

- host ネットワーク
  - back_host
    - 【ホスティング】バックエンド
    - Port：3001
  - front_host
    - 【ホスティング】フロントエンド
    - Port：3500
- nw_development(bridge ネットワーク)
  - dev
    - 【開発】開発用のコンテナ、node v16 の環境が整備されているため、build や test の実行はこちらのコンテナで実施
    - すべての ts、js、node.js の開発は本コンテナで行う
  - db
    - dynamoDB
  - db_admin
    - DynamoDB の管理画面
  - terraform_dynamodb_db
    - DynamoDB の DB 初期化用
    - extra

## 起動手順

- 前提
  - Linux もしくは Mac ホストであること
  - docker、docker-compose が導入されていること
  - make など、その他一般的なコマンドが一通り導入されていること

1. `.env`ファイルを調整
   - 本リポジトリの `.env` について、各パスなどを自身の環境に合わせて調整
   - 各アプリケーションのリポジトリについても、 `.env` を作成
2. Docker ホストに本プロジェクトを共有し、ログイン
   - ※必ずしも共有でなくても良い、ホスト上に直接ソースがある状態でも問題ない
3. 共有したディレクトリに移動し、イメージをビルド
   - make build
4. 【extra】初期化などの追加対応を実行：DynamoDB の Seeder 実行
   - make run_compose_init
   - ※初回処理に時間がかかるのでしばらく放置
     - `terraform_dynamodb_db | Apply complete! Resources:` のような表示が出てきたら概ね完了
   - ※2 回目以降は make run_compose で良い（DB に変更がある場合のみ run_compose_init を実行）

## 開発手順

1. 起動手順に沿ってコンテナを立ち上げる
2. 開発対象について、【開発】のタグがついたコンテナにログイン
   - 【bash があるコンテナ】docker exec -it {コンテナ名} /bin/bash
   - 【bash がないコンテナ】docker exec -it {コンテナ名} /bin/sh
3. 続きはコード側のリポジトリを参照

## その他

### ポートフォワードについて

- .env で指定したポートについて、VirtualBox などの VM 上で動作させていて、ホスト OS 上からアクセスしたい場合はポートフォワーディング設定を行うこと
- 本ページ内でポートを取り扱う箇所についてはデフォルトのポートにて記載を行う

### DynamoDB について

- 管理画面はブラウザで<http://localhost:8001>にアクセス

### DynamoDB 投入データの作成方法

- [こちら](https://dynobase.dev/dynamodb-json-converter-tool/)のサイトで DynamoDB 用の JSON 形式と通常の JSON 形式の相互変換が可能
