// SPDX-FileCopyrightText: 2026 Padparadscho <contact@padparadscho.com>
// SPDX-License-Identifier: AGPL-3.0-only

import { z } from "zod";

const envSchema = z.object({
	POOLED_DATABASE_URL: z.url(),
	DIRECT_DATABASE_URL: z.url(),
});

export const env = envSchema.parse(process.env);
