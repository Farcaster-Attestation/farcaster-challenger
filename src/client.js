"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Client = void 0;
var viem_1 = require("viem");
var chains_1 = require("viem/chains");
var env_1 = require("./env");
var wallet_optimistic_verifier_1 = require("./abi/wallet.optimistic.verifier");
var log_1 = require("./log");
var accounts_1 = require("viem/accounts");
var Client = /** @class */ (function () {
    function Client() {
        var chain;
        switch (env_1.NETWORK) {
            case "optimism":
                chain = chains_1.optimism;
                break;
            case "base":
                chain = chains_1.base;
                break;
            default:
                chain = chains_1.optimismSepolia;
        }
        this.publicClient = (0, viem_1.createPublicClient)({
            chain: chain,
            transport: (0, viem_1.http)(env_1.RPC_URL),
        });
        this.walletClient = (0, viem_1.createWalletClient)({
            chain: chain,
            transport: (0, viem_1.http)(env_1.RPC_URL),
        });
    }
    Client.getInstance = function () {
        if (!Client.instance) {
            Client.instance = new Client();
        }
        return Client.instance;
    };
    // verifyAdd returns true if signature is invalid
    // otherwise returns false
    Client.prototype.verifyAdd = function (fid, verifyAddress, publicKey, signature) {
        return __awaiter(this, void 0, void 0, function () {
            var result, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.publicClient.readContract({
                                address: env_1.WALLET_VERIFIER_ADDRESS,
                                abi: wallet_optimistic_verifier_1.WalletOptimisticVerifierABI,
                                functionName: "tryChallengeAdd",
                                args: [
                                    fid,
                                    verifyAddress,
                                    publicKey,
                                    signature,
                                ],
                            })];
                    case 1:
                        result = _a.sent();
                        log_1.logger.info("tryChallengeAdd: ".concat(result));
                        return [2 /*return*/, result];
                    case 2:
                        err_1 = _a.sent();
                        log_1.logger.error("tryChallengeAdd error: ".concat(err_1));
                        return [2 /*return*/, false];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // verifyRemove returns true if signature is invalid
    // otherwise returns false
    Client.prototype.verifyRemove = function (fid, verifyAddress, publicKey, signature) {
        return __awaiter(this, void 0, void 0, function () {
            var result, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.publicClient.readContract({
                                address: env_1.WALLET_VERIFIER_ADDRESS,
                                abi: wallet_optimistic_verifier_1.WalletOptimisticVerifierABI,
                                functionName: "tryChallengeRemove",
                                args: [
                                    fid,
                                    verifyAddress,
                                    publicKey,
                                    signature,
                                ],
                            })];
                    case 1:
                        result = _a.sent();
                        log_1.logger.info("tryChallengeRemove: ".concat(result));
                        return [2 /*return*/, result];
                    case 2:
                        err_2 = _a.sent();
                        log_1.logger.error("tryChallengeRemove error: ".concat(err_2));
                        return [2 /*return*/, false];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Client.prototype.challengeAdd = function (fid, verifyAddress, publicKey, signature) {
        return __awaiter(this, void 0, void 0, function () {
            var request, txHash;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.publicClient.simulateContract({
                            address: env_1.WALLET_VERIFIER_ADDRESS,
                            abi: wallet_optimistic_verifier_1.WalletOptimisticVerifierABI,
                            functionName: "challengeAdd",
                            args: [
                                fid,
                                verifyAddress,
                                publicKey,
                                signature,
                            ],
                            account: (0, accounts_1.privateKeyToAccount)(env_1.PRIVATE_KEY, { nonceManager: viem_1.nonceManager }),
                        })];
                    case 1:
                        request = (_a.sent()).request;
                        return [4 /*yield*/, this.walletClient.writeContract(request)];
                    case 2:
                        txHash = _a.sent();
                        log_1.logger.info("Submitted proof to contract: ".concat(txHash));
                        return [2 /*return*/, txHash];
                }
            });
        });
    };
    Client.prototype.challengeRemove = function (fid, verifyAddress, publicKey, signature) {
        return __awaiter(this, void 0, void 0, function () {
            var request, txHash;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.publicClient.simulateContract({
                            address: env_1.WALLET_VERIFIER_ADDRESS,
                            abi: wallet_optimistic_verifier_1.WalletOptimisticVerifierABI,
                            functionName: "challengeRemove",
                            args: [
                                fid,
                                verifyAddress,
                                publicKey,
                                signature,
                            ],
                            account: (0, accounts_1.privateKeyToAccount)(env_1.PRIVATE_KEY, { nonceManager: viem_1.nonceManager }),
                        })];
                    case 1:
                        request = (_a.sent()).request;
                        return [4 /*yield*/, this.walletClient.writeContract(request)];
                    case 2:
                        txHash = _a.sent();
                        log_1.logger.info("Submitted proof to contract: ".concat(txHash));
                        return [2 /*return*/, txHash];
                }
            });
        });
    };
    return Client;
}());
exports.Client = Client;
