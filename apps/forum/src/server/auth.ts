// SPDX-FileCopyrightText: 2026 Padparadscho <contact@padparadscho.com>
// SPDX-License-Identifier: AGPL-3.0-only

import { createServerFn } from "@tanstack/react-start";
import { setCookie } from "@tanstack/react-start/server";
import { createChallenge, verifyChallenge } from "@voxlens/auth";
import { z } from "zod";
import { SESSION_COOKIE_NAME } from "@/lib/session.ts";

const createChallengeSchema = z.object({
	address: z.string().startsWith("G").length(56),
});

export const requestChallenge = createServerFn({ method: "POST" })
	.validator((input: unknown) => createChallengeSchema.parse(input))
	.handler(async ({ data }) => {
		return createChallenge(data.address);
	});

const verifyChallengeSchema = z.object({
	address: z.string().startsWith("G").length(56),
	transactionXdr: z.string(),
});

export const submitChallenge = createServerFn({ method: "POST" })
	.validator((input: unknown) => verifyChallengeSchema.parse(input))
	.handler(async ({ data }) => {
		const { sessionToken, role } = await verifyChallenge(
			data.address,
			data.transactionXdr,
		);

		setCookie(SESSION_COOKIE_NAME, sessionToken, {
			httpOnly: true,
			secure: true,
			sameSite: "lax",
			maxAge: 60 * 60 * 24 * 30,
			path: "/",
		});

		return { role };
	});
