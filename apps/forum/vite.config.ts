// SPDX-FileCopyrightText: 2026 Padparadscho <contact@padparadscho.com>
// SPDX-License-Identifier: AGPL-3.0-only

import path from "node:path";
import tailwindcss from "@tailwindcss/vite";
import { devtools } from "@tanstack/devtools-vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";

export default defineConfig(({ mode }) => {
	Object.assign(
		process.env,
		loadEnv(mode, path.resolve(__dirname, "../.."), ""),
	);

	return {
		server: {
			port: 3000,
		},
		resolve: {
			tsconfigPaths: true,
		},
		plugins: [
			tanstackStart(),
			viteReact(),
			devtools({ injectSource: { enabled: false } }),
			tailwindcss(),
		],
	};
});
