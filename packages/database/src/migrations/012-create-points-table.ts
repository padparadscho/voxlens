// SPDX-FileCopyrightText: 2026 Padparadscho <contact@padparadscho.com>
// SPDX-License-Identifier: AGPL-3.0-only

import { type Kysely, sql } from "kysely";

export async function up(db: Kysely<any>): Promise<void> {
	await db.schema
		.createTable("points")
		.addColumn("point_id", "serial", (col) => col.primaryKey())
		.addColumn("user_address", "varchar", (col) =>
			col.notNull().references("users.user_address"),
		)
		.addColumn("point_amount", "integer", (col) => col.notNull())
		.addColumn("point_reason", "varchar", (col) => col.notNull())
		.addColumn("point_granted_by", "varchar", (col) =>
			col.references("users.user_address"),
		)
		.addColumn("point_created_at", "timestamptz", (col) =>
			col.notNull().defaultTo(sql`now()`),
		)
		.execute();
}

export async function down(db: Kysely<any>): Promise<void> {
	await db.schema.dropTable("points").execute();
}
