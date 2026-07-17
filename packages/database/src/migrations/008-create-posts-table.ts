// SPDX-FileCopyrightText: 2026 Padparadscho <contact@padparadscho.com>
// SPDX-License-Identifier: AGPL-3.0-only

import { type Kysely, sql } from "kysely";

export async function up(db: Kysely<any>): Promise<void> {
	await db.schema
		.createTable("posts")
		.addColumn("post_id", "serial", (col) => col.primaryKey())
		.addColumn("category_id", "integer", (col) =>
			col.notNull().references("categories.category_id"),
		)
		.addColumn("user_address", "varchar", (col) =>
			col.notNull().references("users.user_address"),
		)
		.addColumn("post_title", "varchar", (col) => col.notNull())
		.addColumn("is_pinned", "boolean", (col) => col.notNull().defaultTo(false))
		.addColumn("is_locked", "boolean", (col) => col.notNull().defaultTo(false))
		.addColumn("post_created_at", "timestamptz", (col) =>
			col.notNull().defaultTo(sql`now()`),
		)
		.execute();
}

export async function down(db: Kysely<any>): Promise<void> {
	await db.schema.dropTable("posts").execute();
}
