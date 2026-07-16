.PHONY: install migrate codegen check lint format

install:
	pnpm install

migrate:
	pnpm migrate

codegen:
	pnpm codegen

check:
	pnpm check

lint:
	pnpm lint

format:
	pnpm format
