// SPDX-FileCopyrightText: 2026 Padparadscho <contact@padparadscho.com>
// SPDX-License-Identifier: AGPL-3.0-only

import { z } from "zod";

const envSchema = z.object({
	STELLAR_NETWORK: z.enum(["PUBLIC", "TESTNET"]),
	STELLAR_SERVER_SECRET_KEY: z.string(),
	AUTH_HOME_DOMAIN: z.string(),
	AUTH_WEB_AUTH_DOMAIN: z.string(),
	SESSION_SECRET: z.string().min(32),
});

export const env = envSchema.parse(process.env);
