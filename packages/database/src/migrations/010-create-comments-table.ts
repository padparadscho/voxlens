// SPDX-FileCopyrightText: 2026 Padparadscho <contact@padparadscho.com>
// SPDX-License-Identifier: AGPL-3.0-only

import { type Kysely, sql } from "kysely";

export async function up(db: Kysely<any>): Promise<void> {
	await db.schema
		.createTable("comments")
		.addColumn("comment_id", "serial", (col) => col.primaryKey())
		.addColumn("post_id", "integer", (col) =>
			col.notNull().references("posts.post_id"),
		)
		.addColumn("parent_id", "integer", (col) =>
			col.references("comments.comment_id"),
		)
		.addColumn("user_address", "varchar", (col) =>
			col.notNull().references("users.user_address"),
		)
		.addColumn("comment_body", "text", (col) => col.notNull())
		.addColumn("comment_created_at", "timestamptz", (col) =>
			col.notNull().defaultTo(sql`now()`),
		)
		.addColumn("comment_edited_at", "timestamptz")
		.addColumn("comment_removed_at", "timestamptz")
		.execute();
}

export async function down(db: Kysely<any>): Promise<void> {
	await db.schema.dropTable("comments").execute();
}
