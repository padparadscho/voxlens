// SPDX-FileCopyrightText: 2026 Padparadscho <contact@padparadscho.com>
// SPDX-License-Identifier: AGPL-3.0-only

import type { Kysely } from "kysely";

export async function up(db: Kysely<any>): Promise<void> {
	await db.schema
		.createTable("post_tags")
		.addColumn("post_id", "integer", (col) =>
			col.notNull().references("posts.post_id"),
		)
		.addColumn("tag_id", "integer", (col) =>
			col.notNull().references("tags.tag_id"),
		)
		.addPrimaryKeyConstraint("post_tags_pk", ["post_id", "tag_id"])
		.execute();
}

export async function down(db: Kysely<any>): Promise<void> {
	await db.schema.dropTable("post_tags").execute();
}
