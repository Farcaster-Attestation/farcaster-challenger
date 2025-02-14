import { challenge, challengeInterval } from "./handler/challenge.js";
import { logger } from "./log.js";
import "./env.js";

const runChallenge = async () => {
    try {
        await challengeInterval();
        logger.info("Challenge handler completed successfully");
    } catch (error) {
        logger.error("Error in challenge handler:", error);
    }
};

// Initial run
runChallenge();

// Prevent the Node.js process from exiting
process.on("uncaughtException", (error) => {
    logger.error("Uncaught Exception:", error);
});

process.on("unhandledRejection", (reason, promise) => {
    logger.error("Unhandled Rejection at:", promise, "reason:", reason);
});
