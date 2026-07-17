// SPDX-FileCopyrightText: 2026 Padparadscho <contact@padparadscho.com>
// SPDX-License-Identifier: AGPL-3.0-only

import { type Kysely, sql } from "kysely";

export async function up(db: Kysely<any>): Promise<void> {
	await db.schema
		.createTable("actions")
		.addColumn("action_id", "serial", (col) => col.primaryKey())
		.addColumn("actor_address", "varchar", (col) =>
			col.notNull().references("users.user_address"),
		)
		.addColumn("action_type", "varchar", (col) => col.notNull())
		.addColumn("action_target", "varchar")
		.addColumn("action_meta", "jsonb")
		.addColumn("action_created_at", "timestamptz", (col) =>
			col.notNull().defaultTo(sql`now()`),
		)
		.execute();
}

export async function down(db: Kysely<any>): Promise<void> {
	await db.schema.dropTable("actions").execute();
}
