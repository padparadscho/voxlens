// SPDX-FileCopyrightText: 2026 Padparadscho <contact@padparadscho.com>
// SPDX-License-Identifier: AGPL-3.0-only

import { createServerFn } from "@tanstack/react-start";
import { getCookie } from "@tanstack/react-start/server";
import { verifySession } from "@voxlens/auth";

export const SESSION_COOKIE_NAME = "user_session";

export const getCurrentUser = createServerFn({ method: "GET" }).handler(
	async () => {
		const sessionToken = getCookie(SESSION_COOKIE_NAME);

		if (!sessionToken) {
			return null;
		}

		try {
			return await verifySession(sessionToken);
		} catch {
			return null;
		}
	},
);
