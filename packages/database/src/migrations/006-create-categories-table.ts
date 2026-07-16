// SPDX-FileCopyrightText: 2026 Padparadscho <contact@padparadscho.com>
// SPDX-License-Identifier: AGPL-3.0-only

import type { Kysely } from "kysely";

export async function up(db: Kysely<any>): Promise<void> {
	await db.schema
		.createTable("categories")
		.addColumn("category_id", "serial", (col) => col.primaryKey())
		.addColumn("category_slug", "varchar", (col) => col.notNull().unique())
		.addColumn("category_name", "varchar", (col) => col.notNull())
		.addColumn("min_role_to_post", "varchar", (col) => col.notNull())
		.addColumn("category_section", "varchar", (col) => col.notNull())
		.execute();
}

export async function down(db: Kysely<any>): Promise<void> {
	await db.schema.dropTable("categories").execute();
}
