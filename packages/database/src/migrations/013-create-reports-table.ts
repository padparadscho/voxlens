// SPDX-FileCopyrightText: 2026 Padparadscho <contact@padparadscho.com>
// SPDX-License-Identifier: AGPL-3.0-only

import { type Kysely, sql } from "kysely";

export async function up(db: Kysely<any>): Promise<void> {
	await db.schema
		.createTable("reports")
		.addColumn("report_id", "serial", (col) => col.primaryKey())
		.addColumn("reporter_address", "varchar", (col) =>
			col.notNull().references("users.user_address"),
		)
		.addColumn("reported_content_type", "varchar", (col) => col.notNull())
		.addColumn("reported_content_id", "integer", (col) => col.notNull())
		.addColumn("report_reason", "text", (col) => col.notNull())
		.addColumn("report_status", "varchar", (col) =>
			col.notNull().defaultTo("open"),
		)
		.addColumn("report_reviewed_by", "varchar", (col) =>
			col.references("users.user_address"),
		)
		.addColumn("report_reviewed_at", "timestamptz")
		.addColumn("report_created_at", "timestamptz", (col) =>
			col.notNull().defaultTo(sql`now()`),
		)
		.execute();
}

export async function down(db: Kysely<any>): Promise<void> {
	await db.schema.dropTable("reports").execute();
}
