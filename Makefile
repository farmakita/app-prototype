PORT = 8080

.PHONY: build run stop restart logs check

build:
	docker compose build app

run:
	docker compose up -d app
	@echo "App running at http://localhost:$(PORT)"

stop:
	docker compose down

restart: stop build run

logs:
	docker compose logs -f app

check:
	docker compose run --rm node
