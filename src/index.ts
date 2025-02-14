import { challenge } from "./handler/challenge.js";
import { logger } from "./log.js";

export const handler = async (event: any) => {
    await challenge();
    logger.info("Started challenge handler");

    return { message: "Started challenge" };
};
