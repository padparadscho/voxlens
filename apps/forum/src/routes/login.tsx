// SPDX-FileCopyrightText: 2026 Padparadscho <contact@padparadscho.com>
// SPDX-License-Identifier: AGPL-3.0-only

import freighterApi from "@stellar/freighter-api";
import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button.tsx";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card.tsx";
import { getCurrentUser } from "@/lib/session.ts";
import { requestChallenge, submitChallenge } from "@/server/auth.ts";

const { isConnected, setAllowed, getAddress, signTransaction } = freighterApi;

export const Route = createFileRoute("/login")({
	beforeLoad: async () => {
		const user = await getCurrentUser();

		if (user) {
			throw redirect({ to: "/" });
		}
	},
	component: LoginPage,
});

function LoginPage() {
	const navigate = useNavigate();
	const [error, setError] = useState<string | null>(null);
	const [isConnecting, setIsConnecting] = useState(false);

	async function handleConnect() {
		setError(null);
		setIsConnecting(true);

		try {
			const { isConnected: hasFreighter } = await isConnected();

			if (!hasFreighter) {
				throw new Error("Freighter wallet is not installed.");
			}

			await setAllowed();

			const { address } = await getAddress();

			const { transactionXdr } = await requestChallenge({ data: { address } });

			const { signedTxXdr } = await signTransaction(transactionXdr, {
				networkPassphrase: "Test SDF Network ; September 2015",
			});

			await submitChallenge({ data: { address, transactionXdr: signedTxXdr } });

			navigate({ to: "/" });
		} catch (cause) {
			setError(
				cause instanceof Error ? cause.message : "Failed to connect wallet.",
			);
		} finally {
			setIsConnecting(false);
		}
	}

	return (
		<div className="flex min-h-screen items-center justify-center p-4">
			<Card className="w-full max-w-sm">
				<CardHeader>
					<CardTitle className="text-center">Voxlens</CardTitle>
					<CardDescription className="text-center">
						Unofficial forum for the Stronghold (SHx) community
					</CardDescription>
				</CardHeader>
				<CardContent>
					<Button
						onClick={handleConnect}
						disabled={isConnecting}
						className="w-full"
					>
						{isConnecting ? "Connecting..." : "Login with Freighter"}
					</Button>
					{error && (
						<p className="mt-3 text-center text-sm text-destructive">{error}</p>
					)}
				</CardContent>
			</Card>
		</div>
	);
}
