"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MAX_BEHIND_BLOCKS = exports.WALLET_VERIFIER_ADDRESS = exports.PRIVATE_KEY = exports.RPC_URL = exports.NETWORK = void 0;
exports.NETWORK = process.env["NETWORK"] || "optimism-sepolia";
exports.RPC_URL = process.env["RPC_URL"] || "";
exports.PRIVATE_KEY = process.env["PRIVATE_KEY"] || "";
exports.WALLET_VERIFIER_ADDRESS = process.env["WALLET_VERIFIER_ADDRESS"] || "";
exports.MAX_BEHIND_BLOCKS = parseInt(process.env["MAX_BEHIND_BLOCKS"] || "10");
