.PHONY: all dev test lint build typecheck infra-up infra-down clean

all: dev

dev:
	pnpm dev

test:
	pnpm test

lint:
	pnpm lint

typecheck:
	pnpm typecheck

build:
	pnpm build

infra-up:
	docker compose -f infra/docker-compose.yml up -d

infra-down:
	docker compose -f infra/docker-compose.yml down

clean:
	pnpm -r exec rm -rf node_modules .next dist

