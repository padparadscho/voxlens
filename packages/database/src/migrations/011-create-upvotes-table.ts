// SPDX-FileCopyrightText: 2026 Padparadscho <contact@padparadscho.com>
// SPDX-License-Identifier: AGPL-3.0-only

import { type Kysely, sql } from "kysely";

export async function up(db: Kysely<any>): Promise<void> {
	await db.schema
		.createTable("upvotes")
		.addColumn("upvote_type", "varchar", (col) => col.notNull())
		.addColumn("upvote_id", "integer", (col) => col.notNull())
		.addColumn("user_address", "varchar", (col) =>
			col.notNull().references("users.user_address"),
		)
		.addColumn("upvote_created_at", "timestamptz", (col) =>
			col.notNull().defaultTo(sql`now()`),
		)
		.addPrimaryKeyConstraint("upvotes_pk", [
			"upvote_type",
			"upvote_id",
			"user_address",
		])
		.execute();
}

export async function down(db: Kysely<any>): Promise<void> {
	await db.schema.dropTable("upvotes").execute();
}
