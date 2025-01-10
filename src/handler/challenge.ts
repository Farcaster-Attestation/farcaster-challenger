import EventEmitter2 from "eventemitter2";
import { Indexer } from "./indexer.js";
import { WALLET_VERIFIER_ADDRESS } from "../env.js";
import { Client } from "../client.js";
import { Verify } from "./verify.js";

const emitter = new EventEmitter2();
const indexer = new Indexer(WALLET_VERIFIER_ADDRESS as `0x${string}`, Client.getInstance(), emitter);
const verifier = new Verify(Client.getInstance(), emitter);

export const challenge = async () => {
    // Start the indexer submit events
    await indexer.handleInterval();

    // Start processing events
    await verifier.handleEvent();

};