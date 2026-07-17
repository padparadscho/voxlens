// SPDX-FileCopyrightText: 2026 Padparadscho <contact@padparadscho.com>
// SPDX-License-Identifier: AGPL-3.0-only

import {
	Keypair,
	Networks,
	TransactionBuilder,
	WebAuth,
} from "@stellar/stellar-sdk";
import { db } from "@voxlens/database";
import { z } from "zod";
import { env } from "./config.ts";

const addressSchema = z.string().startsWith("G").length(56);

const CHALLENGE_TIMEOUT_SECONDS = 300;

export async function createChallenge(input: string) {
	const address = addressSchema.parse(input);

	const whitelistedAddress = await db
		.selectFrom("whitelist")
		.select("address")
		.where("address", "=", address)
		.where("address_removed_at", "is", null)
		.executeTakeFirst();

	if (!whitelistedAddress) {
		throw new Error("This address is not whitelisted.");
	}

	const transactionXdr = WebAuth.buildChallengeTx(
		Keypair.fromSecret(env.STELLAR_SERVER_SECRET_KEY),
		address,
		env.AUTH_HOME_DOMAIN,
		CHALLENGE_TIMEOUT_SECONDS,
		env.STELLAR_NETWORK === "PUBLIC" ? Networks.PUBLIC : Networks.TESTNET,
		env.AUTH_WEB_AUTH_DOMAIN,
	);

	await db
		.insertInto("auth_challenges")
		.values({
			user_address: address,
			challenge_nonce: TransactionBuilder.fromXDR(
				transactionXdr,
				env.STELLAR_NETWORK === "PUBLIC" ? Networks.PUBLIC : Networks.TESTNET,
			)
				.hash()
				.toString("hex"),
			challenge_expires_at: new Date(
				Date.now() + CHALLENGE_TIMEOUT_SECONDS * 1000,
			),
			is_used: false,
		})
		.execute();

	return { transactionXdr };
}
