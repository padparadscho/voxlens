// SPDX-FileCopyrightText: 2026 Padparadscho <contact@padparadscho.com>
// SPDX-License-Identifier: AGPL-3.0-only

import { defineConfig } from "vitest/config";

process.loadEnvFile(new URL("../../.env", import.meta.url));

export default defineConfig({
	test: {
		environment: "node",
	},
});
