// SPDX-FileCopyrightText: 2026 Padparadscho <contact@padparadscho.com>
// SPDX-License-Identifier: AGPL-3.0-only

import { jwtVerify, SignJWT } from "jose";
import { env } from "./config.ts";

const sessionSecret = new TextEncoder().encode(env.SESSION_SECRET);

type SessionPayload = {
	address: string;
	role: string;
};

export async function createSession(payload: SessionPayload) {
	return new SignJWT(payload)
		.setProtectedHeader({ alg: "HS256" })
		.setIssuedAt()
		.setExpirationTime("30d")
		.sign(sessionSecret);
}

export async function verifySession(token: string): Promise<SessionPayload> {
	const { payload } = await jwtVerify(token, sessionSecret);
	return payload as SessionPayload;
}
