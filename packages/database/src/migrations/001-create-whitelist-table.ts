// SPDX-FileCopyrightText: 2026 Padparadscho <contact@padparadscho.com>
// SPDX-License-Identifier: AGPL-3.0-only

import { type Kysely, sql } from "kysely";

export async function up(db: Kysely<any>): Promise<void> {
	await db.schema
		.createTable("whitelist")
		.addColumn("address", "varchar", (col) => col.primaryKey())
		.addColumn("address_added_at", "timestamptz", (col) =>
			col.notNull().defaultTo(sql`now()`),
		)
		.addColumn("address_removed_at", "timestamptz")
		.execute();
}

export async function down(db: Kysely<any>): Promise<void> {
	await db.schema.dropTable("whitelist").execute();
}
