// SPDX-FileCopyrightText: 2026 Padparadscho <contact@padparadscho.com>
// SPDX-License-Identifier: AGPL-3.0-only

import { type Kysely, sql } from "kysely";

export async function up(db: Kysely<any>): Promise<void> {
	await db.schema
		.createTable("auth_challenges")
		.addColumn("challenge_id", "uuid", (col) =>
			col.primaryKey().defaultTo(sql`gen_random_uuid()`),
		)
		.addColumn("user_address", "varchar", (col) => col.notNull())
		.addColumn("challenge_nonce", "varchar", (col) => col.notNull())
		.addColumn("challenge_expires_at", "timestamptz", (col) => col.notNull())
		.addColumn("is_used", "boolean", (col) => col.notNull().defaultTo(false))
		.execute();
}

export async function down(db: Kysely<any>): Promise<void> {
	await db.schema.dropTable("auth_challenges").execute();
}
