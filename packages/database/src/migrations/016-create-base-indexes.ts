// SPDX-FileCopyrightText: 2026 Padparadscho <contact@padparadscho.com>
// SPDX-License-Identifier: AGPL-3.0-only

import type { Kysely } from "kysely";

export async function up(db: Kysely<any>): Promise<void> {
	await db.schema
		.createIndex("posts_category_id_post_created_at_idx")
		.on("posts")
		.columns(["category_id", "post_created_at"])
		.execute();

	await db.schema
		.createIndex("posts_post_created_at_idx")
		.on("posts")
		.column("post_created_at")
		.execute();

	await db.schema
		.createIndex("comments_post_id_comment_created_at_idx")
		.on("comments")
		.columns(["post_id", "comment_created_at"])
		.execute();

	await db.schema
		.createIndex("comments_comment_created_at_idx")
		.on("comments")
		.column("comment_created_at")
		.execute();

	await db.schema
		.createIndex("upvotes_upvote_created_at_idx")
		.on("upvotes")
		.column("upvote_created_at")
		.execute();

	await db.schema
		.createIndex("post_tags_tag_id_idx")
		.on("post_tags")
		.column("tag_id")
		.execute();

	await db.schema
		.createIndex("points_user_address_point_created_at_idx")
		.on("points")
		.columns(["user_address", "point_created_at"])
		.execute();

	await db.schema
		.createIndex("points_point_created_at_idx")
		.on("points")
		.column("point_created_at")
		.execute();

	await db.schema
		.createIndex("actions_action_created_at_idx")
		.on("actions")
		.column("action_created_at")
		.execute();

	await db.schema
		.createIndex("reports_report_status_report_created_at_idx")
		.on("reports")
		.columns(["report_status", "report_created_at"])
		.execute();

	await db.schema
		.createIndex("users_user_role_idx")
		.on("users")
		.column("user_role")
		.execute();
}

export async function down(db: Kysely<any>): Promise<void> {
	await db.schema.dropIndex("users_user_role_idx").execute();
	await db.schema
		.dropIndex("reports_report_status_report_created_at_idx")
		.execute();
	await db.schema.dropIndex("actions_action_created_at_idx").execute();
	await db.schema.dropIndex("points_point_created_at_idx").execute();
	await db.schema
		.dropIndex("points_user_address_point_created_at_idx")
		.execute();
	await db.schema.dropIndex("post_tags_tag_id_idx").execute();
	await db.schema.dropIndex("upvotes_upvote_created_at_idx").execute();
	await db.schema.dropIndex("comments_comment_created_at_idx").execute();
	await db.schema
		.dropIndex("comments_post_id_comment_created_at_idx")
		.execute();
	await db.schema.dropIndex("posts_post_created_at_idx").execute();
	await db.schema.dropIndex("posts_category_id_post_created_at_idx").execute();
}
