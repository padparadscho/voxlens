// SPDX-FileCopyrightText: 2026 Padparadscho <contact@padparadscho.com>
// SPDX-License-Identifier: AGPL-3.0-only

import { type Kysely, sql } from "kysely";

export async function up(db: Kysely<any>): Promise<void> {
	await db.schema
		.createTable("users")
		.addColumn("user_address", "varchar", (col) => col.primaryKey())
		.addColumn("user_role", "varchar", (col) =>
			col.notNull().defaultTo("member"),
		)
		.addColumn("user_points", "integer", (col) => col.notNull().defaultTo(0))
		.addColumn("user_banned_at", "timestamptz")
		.addColumn("user_created_at", "timestamptz", (col) =>
			col.notNull().defaultTo(sql`now()`),
		)
		.execute();
}

export async function down(db: Kysely<any>): Promise<void> {
	await db.schema.dropTable("users").execute();
}
