// SPDX-FileCopyrightText: 2026 Padparadscho <contact@padparadscho.com>
// SPDX-License-Identifier: AGPL-3.0-only

import type { Kysely } from "kysely";

const slugs = [
	"admin",
	"contributor",
	"developer",
	"edp",
	"member",
	"moderator",
	"stronghold",
	"supporter",
];

export async function up(db: Kysely<any>): Promise<void> {
	await db
		.insertInto("badges")
		.values([
			{ badge_slug: "admin", badge_name: "Admin", is_auto: false },
			{ badge_slug: "contributor", badge_name: "Contributor", is_auto: true },
			{ badge_slug: "developer", badge_name: "Developer", is_auto: false },
			{ badge_slug: "edp", badge_name: "EDP", is_auto: false },
			{ badge_slug: "member", badge_name: "Member", is_auto: true },
			{ badge_slug: "moderator", badge_name: "Moderator", is_auto: false },
			{ badge_slug: "stronghold", badge_name: "Stronghold", is_auto: false },
			{ badge_slug: "supporter", badge_name: "Supporter", is_auto: false },
		])
		.execute();
}

export async function down(db: Kysely<any>): Promise<void> {
	await db.deleteFrom("badges").where("badge_slug", "in", slugs).execute();
}
