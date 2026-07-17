// SPDX-FileCopyrightText: 2026 Padparadscho <contact@padparadscho.com>
// SPDX-License-Identifier: AGPL-3.0-only

import type { Kysely } from "kysely";

export async function up(db: Kysely<any>): Promise<void> {
	await db.schema
		.createTable("events")
		.addColumn("event_id", "serial", (col) => col.primaryKey())
		.addColumn("event_title", "varchar", (col) => col.notNull())
		.addColumn("event_description", "text")
		.addColumn("event_starts_at", "timestamptz", (col) => col.notNull())
		.addColumn("event_ends_at", "timestamptz", (col) => col.notNull())
		.addColumn("event_created_by", "varchar", (col) =>
			col.notNull().references("users.user_address"),
		)
		.execute();
}

export async function down(db: Kysely<any>): Promise<void> {
	await db.schema.dropTable("events").execute();
}
