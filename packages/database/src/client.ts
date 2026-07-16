// SPDX-FileCopyrightText: 2026 Padparadscho <contact@padparadscho.com>
// SPDX-License-Identifier: AGPL-3.0-only

import { attachDatabasePool } from "@vercel/functions";
import { Kysely, PostgresDialect } from "kysely";
import { Pool } from "pg";
import { env } from "./config.ts";
import type { DB } from "./schema.ts";

const pool = new Pool({
	connectionString: env.POOLED_DATABASE_URL,
	max: 5,
	idleTimeoutMillis: 10_000,
	connectionTimeoutMillis: 10_000,
});

attachDatabasePool(pool);

const dialect = new PostgresDialect({ pool });

export const db = new Kysely<DB>({ dialect });
