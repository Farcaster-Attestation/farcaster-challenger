import { Indexer } from "./indexer.js";
import { WALLET_VERIFIER_ADDRESS } from "../env.js";
import { Client } from "../client.js";
import { Verify } from "./verify.js";

const verifier = new Verify(Client.getInstance());

const indexer = new Indexer(
    WALLET_VERIFIER_ADDRESS as `0x${string}`,
    Client.getInstance(),
    verifier,
);

export const challenge = async () => {
    // Index once
    await indexer.index();
};

export const challengeInterval = async () => {
    // Start the indexer submit events
    await indexer.handleInterval();
};
