.PHONY: install migrate codegen dev build check lint format

install:
	pnpm install

migrate:
	pnpm migrate

codegen:
	pnpm codegen

dev:
	pnpm dev

build:
	pnpm build

check:
	pnpm check

lint:
	pnpm lint

format:
	pnpm format
