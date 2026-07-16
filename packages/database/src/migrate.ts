// SPDX-FileCopyrightText: 2026 Padparadscho <contact@padparadscho.com>
// SPDX-License-Identifier: AGPL-3.0-only

import { promises as fs } from "node:fs";
import path from "node:path";
import { Kysely, PostgresDialect } from "kysely";
import { FileMigrationProvider, Migrator } from "kysely/migration";
import { Pool } from "pg";
import { env } from "./config.ts";

async function migrateToLatest() {
	const db = new Kysely({
		dialect: new PostgresDialect({
			pool: new Pool({
				connectionString: env.DIRECT_DATABASE_URL,
			}),
		}),
	});

	const migrator = new Migrator({
		db,
		provider: new FileMigrationProvider({
			fs,
			path,
			migrationFolder: path.join(import.meta.dirname, "migrations"),
		}),
	});

	const { error, results } = await migrator.migrateToLatest();

	results?.forEach((it) => {
		if (it.status === "Success") {
			console.log(`migration "${it.migrationName}" ran successfully`);
		} else if (it.status === "Error") {
			console.error(`migration "${it.migrationName}" failed`);
		}
	});

	if (error) {
		console.error("migration failed");
		console.error(error);
		process.exit(1);
	}

	await db.destroy();
}

migrateToLatest();
