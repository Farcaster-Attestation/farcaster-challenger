import EventEmitter2 from "eventemitter2";
import { MessageType } from "@farcaster/core";
import { Client } from "../client.js";
import { EVENT_SUBMIT_VERIFICATION } from "../constant.js";
import { logger } from "../log.js";

export class Verify {
    constructor(private client: Client) {}

    async processVerification(data: any) {
        try {
            logger.info(
                `Processing verification: fid ${data.fid} - type: ${data.messageType}`,
            );
            switch (data.messageType) {
                case MessageType.VERIFICATION_ADD_ETH_ADDRESS: {
                    const verified = await this.client.verifyAdd(
                        BigInt(data.fid) as bigint,
                        data.verifyAddress as `0x${string}`,
                        data.publicKey as `0x${string}`,
                        data.signature as `0x${string}`,
                    );
                    logger.info(`Verification add address: ${verified}`);

                    if (verified) {
                        // call the challengeAdd function
                        await this.client.challengeAdd(
                            BigInt(data.fid) as bigint,
                            data.verifyAddress as `0x${string}`,
                            data.publicKey as `0x${string}`,
                            data.signature as `0x${string}`,
                        );
                    }
                    break;
                }
                case MessageType.VERIFICATION_REMOVE: {
                    const verified = await this.client.verifyRemove(
                        BigInt(data.fid).valueOf(),
                        data.verifyAddress,
                        data.publicKey,
                        data.signature,
                    );
                    logger.info(`Verification remove: ${verified}`);

                    if (verified) {
                        // call the challengeRemove function
                        await this.client.challengeRemove(
                            BigInt(data.fid).valueOf(),
                            data.verifyAddress,
                            data.publicKey,
                            data.signature,
                        );
                    }

                    break;
                }
                default:
                    logger.error(`Unknown message type: ${data.messageType}`);
                    return;
            }
        } catch (e) {
            logger.error(`Error processing verification: ${e}`);
        }
    }
}
