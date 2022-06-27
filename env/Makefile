sam-host_version=1.0.0
sam-api_version=1.0.0

# イメージのビルドを実行
build:
	# services
	docker build -t sam-host:${sam-host_version} ./dockerfiles/sam-host/
	docker build -t sam-api:${sam-api_version} ./dockerfiles/sam-api/

	# latest_tags
	docker tag sam-host:${sam-host_version} sam-host:latest
	docker tag sam-api:${sam-api_version} sam-api:latest

# コンテナの立ち上げ（フォアグラウンド、extra立ち上げあり。初回はこちら。）
run_compose_init:
	docker-compose --profile extra up

# コンテナの立ち上げ（バックグラウンド、extra立ち上げなし）
run_compose:
	docker-compose up -d
