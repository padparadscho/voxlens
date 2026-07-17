// SPDX-FileCopyrightText: 2026 Padparadscho <contact@padparadscho.com>
// SPDX-License-Identifier: AGPL-3.0-only

import type { Kysely } from "kysely";

const slugs = [
	"announcement",
	"brainstorm",
	"community",
	"draft",
	"edp",
	"general",
	"question",
	"official",
	"project",
	"proposal",
];

export async function up(db: Kysely<any>): Promise<void> {
	await db
		.insertInto("tags")
		.values([
			{
				tag_slug: "announcement",
				tag_name: "Announcement",
				min_role_to_assign: "admin",
				is_auto: true,
			},
			{
				tag_slug: "brainstorm",
				tag_name: "Brainstorm",
				min_role_to_assign: "contributor",
				is_auto: false,
			},
			{
				tag_slug: "community",
				tag_name: "Community",
				min_role_to_assign: "admin",
				is_auto: false,
			},
			{
				tag_slug: "draft",
				tag_name: "Draft",
				min_role_to_assign: "contributor",
				is_auto: false,
			},
			{
				tag_slug: "edp",
				tag_name: "EDP",
				min_role_to_assign: "developer",
				is_auto: true,
			},
			{
				tag_slug: "general",
				tag_name: "General",
				min_role_to_assign: "contributor",
				is_auto: false,
			},
			{
				tag_slug: "question",
				tag_name: "Question",
				min_role_to_assign: "contributor",
				is_auto: false,
			},
			{
				tag_slug: "official",
				tag_name: "Official",
				min_role_to_assign: "admin",
				is_auto: false,
			},
			{
				tag_slug: "project",
				tag_name: "Project",
				min_role_to_assign: "developer",
				is_auto: true,
			},
			{
				tag_slug: "proposal",
				tag_name: "Proposal",
				min_role_to_assign: "admin",
				is_auto: true,
			},
		])
		.execute();
}

export async function down(db: Kysely<any>): Promise<void> {
	await db.deleteFrom("tags").where("tag_slug", "in", slugs).execute();
}
