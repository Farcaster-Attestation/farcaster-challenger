import * as dotenv from 'dotenv';

// Load the .env file
dotenv.config();
export const NETWORK = process.env["NETWORK"] || "optimism-sepolia";
export const RPC_URL = process.env["RPC_URL"] || "";
export const PRIVATE_KEY = process.env["PRIVATE_KEY"] || "";
export const WALLET_VERIFIER_ADDRESS = process.env["WALLET_VERIFIER_ADDRESS"] || "";
export const MAX_BEHIND_BLOCKS = parseInt(process.env["MAX_BEHIND_BLOCKS"] || "10");