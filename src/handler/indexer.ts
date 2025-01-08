import { EventEmitter2 } from "eventemitter2";
import { Client } from "../client.js";
import { WalletOptimisticVerifierABI } from "../abi/wallet.optimistic.verifier.js";
import { EVENT_SUBMIT_VERIFICATION } from "../constant.js";
import { MAX_BEHIND_BLOCKS } from "../env.js";
import { logger } from "../log.js";


export class Indexer {
    private syncHead: bigint;
    constructor(
        private readonly contract: `0x${string}`,
        private readonly client: Client,
        private readonly emitter: EventEmitter2,
    ) {
        this.syncHead = 0n;
    }
    async handleInterval() {
        return setInterval(async () => {
            try {
                await this.index();
            } catch (e) {
                logger.error(`Error indexing: ${e}`);
            }
        }, 4000);
    }

    async index() {
        const lastHead = await this.getLastHead();
        logger.info(`Last head: ${lastHead.number} Sync head: ${this.syncHead}`);
        if (this.syncHead === 0n) {
            this.syncHead = lastHead.number - BigInt(MAX_BEHIND_BLOCKS);
        }
        if (this.syncHead >= lastHead.number) {
            logger.info("No new blocks to index");
            return;
        }
        const fromBlock = this.syncHead + 1n;

        await this.indexRange(fromBlock, lastHead.number);

        this.syncHead = lastHead.number;
        logger.debug(`Indexed blocks from ${fromBlock} to ${lastHead.number}`);
    }

    async indexRange(fromBlock: bigint, toBlock: bigint) {
        logger.info(`Indexing from ${fromBlock} to ${toBlock}`);
        const logs = await this.client.publicClient.getContractEvents({
            address: this.contract,
            abi: WalletOptimisticVerifierABI,
            fromBlock,
            toBlock,
            eventName: "SubmitVerification",
        });

        const submitEvents = logs.map((log) => ({
            txHash: log.transactionHash,
            messageType: log.args.messageType,
            fid: log.args.fid,
            verifyAddress: log.args.verifyAddress,
            publicKey: log.args.publicKey,
            hash: log.args.hash,
            signature: log.args.signature,
            blockNumber: log.blockNumber,
        }));

        submitEvents.forEach((event) => {
            this.emitter.emit(EVENT_SUBMIT_VERIFICATION, event);
        })

        return submitEvents;
    }

    async getLastHead() {
        return this.client.publicClient.getBlock();
    }

}