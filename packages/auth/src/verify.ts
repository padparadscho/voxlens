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
import { createSession } from "./session.ts";

const addressSchema = z.string().startsWith("G").length(56);
const transactionXdrSchema = z.string();

export async function verifyChallenge(input: string, transactionXdr: string) {
	const address = addressSchema.parse(input);
	const signedTransactionXdr = transactionXdrSchema.parse(transactionXdr);

	WebAuth.verifyChallengeTxSigners(
		signedTransactionXdr,
		Keypair.fromSecret(env.STELLAR_SERVER_SECRET_KEY).publicKey(),
		env.STELLAR_NETWORK === "PUBLIC" ? Networks.PUBLIC : Networks.TESTNET,
		[address],
		env.AUTH_HOME_DOMAIN,
		env.AUTH_WEB_AUTH_DOMAIN,
	);

	const authChallenge = await db
		.selectFrom("auth_challenges")
		.selectAll()
		.where("user_address", "=", address)
		.where(
			"challenge_nonce",
			"=",
			TransactionBuilder.fromXDR(
				signedTransactionXdr,
				env.STELLAR_NETWORK === "PUBLIC" ? Networks.PUBLIC : Networks.TESTNET,
			)
				.hash()
				.toString("hex"),
		)
		.where("is_used", "=", false)
		.where("challenge_expires_at", ">", new Date())
		.executeTakeFirst();

	if (!authChallenge) {
		throw new Error("Challenge is invalid, expired, or already used.");
	}

	const whitelistedAddress = await db
		.selectFrom("whitelist")
		.select("address")
		.where("address", "=", address)
		.where("address_removed_at", "is", null)
		.executeTakeFirst();

	if (!whitelistedAddress) {
		throw new Error("This address is not whitelisted.");
	}

	await db
		.updateTable("auth_challenges")
		.set({ is_used: true })
		.where("challenge_id", "=", authChallenge.challenge_id)
		.execute();

	let user = await db
		.selectFrom("users")
		.selectAll()
		.where("user_address", "=", address)
		.executeTakeFirst();

	if (!user) {
		user = await db
			.insertInto("users")
			.values({ user_address: address })
			.returningAll()
			.executeTakeFirstOrThrow();
	}

	if (user.user_banned_at) {
		throw new Error("This address has been banned.");
	}

	const sessionToken = await createSession({
		address: user.user_address,
		role: user.user_role,
	});

	return { sessionToken, role: user.user_role };
}
