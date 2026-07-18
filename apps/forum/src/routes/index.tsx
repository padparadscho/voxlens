// SPDX-FileCopyrightText: 2026 Padparadscho <contact@padparadscho.com>
// SPDX-License-Identifier: AGPL-3.0-only

import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
	return (
		<div className="flex min-h-screen flex-col items-center justify-center">
			<h1 className="text-4xl font-mono">Voxlens</h1>
			<p className="mt-2 text-lg text-gray-500 dark:text-gray-400 font-mono">
				Unofficial forum for the Stronghold (SHx) community.
			</p>
		</div>
	);
}
