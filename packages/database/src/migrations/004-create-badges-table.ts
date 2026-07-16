// SPDX-FileCopyrightText: 2026 Padparadscho <contact@padparadscho.com>
// SPDX-License-Identifier: AGPL-3.0-only

import type { Kysely } from "kysely";

export async function up(db: Kysely<any>): Promise<void> {
	await db.schema
		.createTable("badges")
		.addColumn("badge_id", "serial", (col) => col.primaryKey())
		.addColumn("badge_slug", "varchar", (col) => col.notNull().unique())
		.addColumn("badge_name", "varchar", (col) => col.notNull())
		.addColumn("is_auto", "boolean", (col) => col.notNull().defaultTo(false))
		.execute();
}

export async function down(db: Kysely<any>): Promise<void> {
	await db.schema.dropTable("badges").execute();
}
