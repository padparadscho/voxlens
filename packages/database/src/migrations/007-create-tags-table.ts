// SPDX-FileCopyrightText: 2026 Padparadscho <contact@padparadscho.com>
// SPDX-License-Identifier: AGPL-3.0-only

import type { Kysely } from "kysely";

export async function up(db: Kysely<any>): Promise<void> {
	await db.schema
		.createTable("tags")
		.addColumn("tag_id", "serial", (col) => col.primaryKey())
		.addColumn("tag_slug", "varchar", (col) => col.notNull().unique())
		.addColumn("tag_name", "varchar", (col) => col.notNull())
		.addColumn("min_role_to_assign", "varchar", (col) => col.notNull())
		.addColumn("is_auto", "boolean", (col) => col.notNull().defaultTo(false))
		.execute();
}

export async function down(db: Kysely<any>): Promise<void> {
	await db.schema.dropTable("tags").execute();
}
