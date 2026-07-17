// SPDX-FileCopyrightText: 2026 Padparadscho <contact@padparadscho.com>
// SPDX-License-Identifier: AGPL-3.0-only

import { Keypair, Networks, TransactionBuilder } from "@stellar/stellar-sdk";
import { db } from "@voxlens/database";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { env } from "../src/config.ts";
import {
	createChallenge,
	verifyChallenge,
	verifySession,
} from "../src/index.ts";

describe("auth test", () => {
	const testKeypair = Keypair.random();
	const address = testKeypair.publicKey();

	beforeAll(async () => {
		await db.insertInto("whitelist").values({ address }).execute();
	});

	afterAll(async () => {
		await db
			.deleteFrom("auth_challenges")
			.where("user_address", "=", address)
			.execute();
		await db.deleteFrom("users").where("user_address", "=", address).execute();
		await db.deleteFrom("whitelist").where("address", "=", address).execute();
		await db.destroy();
	});

	it("rejects a challenge request for a non whitelisted address", async () => {
		const strangerKeypair = Keypair.random();

		await expect(createChallenge(strangerKeypair.publicKey())).rejects.toThrow(
			"not whitelisted",
		);
	});

	it("issues a challenge for a whitelisted address", async () => {
		const { transactionXdr } = await createChallenge(address);

		expect(transactionXdr).toBeTypeOf("string");
		expect(transactionXdr.length).toBeGreaterThan(0);
	});

	it("verifies a correctly signed challenge and returns a session", async () => {
		const { transactionXdr } = await createChallenge(address);

		const networkPassphrase =
			env.STELLAR_NETWORK === "PUBLIC" ? Networks.PUBLIC : Networks.TESTNET;
		const transaction = TransactionBuilder.fromXDR(
			transactionXdr,
			networkPassphrase,
		);
		transaction.sign(testKeypair);

		const { sessionToken, role } = await verifyChallenge(
			address,
			transaction.toXDR(),
		);

		expect(role).toBe("member");

		const payload = await verifySession(sessionToken);
		expect(payload.address).toBe(address);
		expect(payload.role).toBe("member");
	});

	it("rejects a challenge signed by the wrong keypair", async () => {
		const { transactionXdr } = await createChallenge(address);

		const networkPassphrase =
			env.STELLAR_NETWORK === "PUBLIC" ? Networks.PUBLIC : Networks.TESTNET;
		const transaction = TransactionBuilder.fromXDR(
			transactionXdr,
			networkPassphrase,
		);
		transaction.sign(Keypair.random());

		await expect(
			verifyChallenge(address, transaction.toXDR()),
		).rejects.toThrow();
	});

	it("rejects reusing an already used challenge", async () => {
		const { transactionXdr } = await createChallenge(address);

		const networkPassphrase =
			env.STELLAR_NETWORK === "PUBLIC" ? Networks.PUBLIC : Networks.TESTNET;
		const transaction = TransactionBuilder.fromXDR(
			transactionXdr,
			networkPassphrase,
		);
		transaction.sign(testKeypair);
		const signedTransactionXdr = transaction.toXDR();

		await verifyChallenge(address, signedTransactionXdr);

		await expect(
			verifyChallenge(address, signedTransactionXdr),
		).rejects.toThrow("invalid, expired, or already used");
	});
});
