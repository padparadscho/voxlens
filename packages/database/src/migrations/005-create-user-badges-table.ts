// SPDX-FileCopyrightText: 2026 Padparadscho <contact@padparadscho.com>
// SPDX-License-Identifier: AGPL-3.0-only

import { type Kysely, sql } from "kysely";

export async function up(db: Kysely<any>): Promise<void> {
	await db.schema
		.createTable("user_badges")
		.addColumn("user_address", "varchar", (col) =>
			col.notNull().references("users.user_address"),
		)
		.addColumn("badge_id", "integer", (col) =>
			col.notNull().references("badges.badge_id"),
		)
		.addColumn("badge_granted_by", "varchar", (col) =>
			col.references("users.user_address"),
		)
		.addColumn("badge_granted_at", "timestamptz", (col) =>
			col.notNull().defaultTo(sql`now()`),
		)
		.addPrimaryKeyConstraint("user_badges_pk", ["user_address", "badge_id"])
		.execute();
}

export async function down(db: Kysely<any>): Promise<void> {
	await db.schema.dropTable("user_badges").execute();
}
