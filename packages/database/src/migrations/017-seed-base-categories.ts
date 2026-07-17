// SPDX-FileCopyrightText: 2026 Padparadscho <contact@padparadscho.com>
// SPDX-License-Identifier: AGPL-3.0-only

import type { Kysely } from "kysely";

const slugs = ["announcements", "discussions", "projects", "proposals"];

export async function up(db: Kysely<any>): Promise<void> {
	await db
		.insertInto("categories")
		.values([
			{
				category_slug: "announcements",
				category_name: "Announcements",
				min_role_to_post: "admin",
				category_section: "community",
			},
			{
				category_slug: "discussions",
				category_name: "Discussions",
				min_role_to_post: "contributor",
				category_section: "community",
			},
			{
				category_slug: "projects",
				category_name: "Projects",
				min_role_to_post: "developer",
				category_section: "community",
			},
			{
				category_slug: "proposals",
				category_name: "Proposals",
				min_role_to_post: "admin",
				category_section: "governance",
			},
		])
		.execute();
}

export async function down(db: Kysely<any>): Promise<void> {
	await db
		.deleteFrom("categories")
		.where("category_slug", "in", slugs)
		.execute();
}
