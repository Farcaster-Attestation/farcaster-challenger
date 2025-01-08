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
exports.Indexer = void 0;
var wallet_optimistic_verifier_1 = require("../abi/wallet.optimistic.verifier");
var constant_1 = require("../constant");
var env_1 = require("../env");
var log_1 = require("../log");
var Indexer = /** @class */ (function () {
    function Indexer(contract, client, emitter) {
        this.contract = contract;
        this.client = client;
        this.emitter = emitter;
        this.syncHead = 0n;
    }
    Indexer.prototype.handleInterval = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, setInterval(function () { return __awaiter(_this, void 0, void 0, function () {
                        var e_1;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    _a.trys.push([0, 2, , 3]);
                                    return [4 /*yield*/, this.index()];
                                case 1:
                                    _a.sent();
                                    return [3 /*break*/, 3];
                                case 2:
                                    e_1 = _a.sent();
                                    log_1.logger.error("Error indexing: ".concat(e_1));
                                    return [3 /*break*/, 3];
                                case 3: return [2 /*return*/];
                            }
                        });
                    }); }, 4000)];
            });
        });
    };
    Indexer.prototype.index = function () {
        return __awaiter(this, void 0, void 0, function () {
            var lastHead, fromBlock;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getLastHead()];
                    case 1:
                        lastHead = _a.sent();
                        if (this.syncHead === 0n) {
                            this.syncHead = lastHead.number - BigInt(env_1.MAX_BEHIND_BLOCKS);
                        }
                        fromBlock = this.syncHead + 1n;
                        return [4 /*yield*/, this.indexRange(fromBlock, lastHead.number)];
                    case 2:
                        _a.sent();
                        this.syncHead = lastHead.number;
                        log_1.logger.debug("Indexed blocks from ".concat(fromBlock, " to ").concat(lastHead.number));
                        return [2 /*return*/];
                }
            });
        });
    };
    Indexer.prototype.indexRange = function (fromBlock, toBlock) {
        return __awaiter(this, void 0, void 0, function () {
            var logs, submitEvents;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.publicClient.getContractEvents({
                            address: this.contract,
                            abi: wallet_optimistic_verifier_1.WalletOptimisticVerifierABI,
                            fromBlock: fromBlock,
                            toBlock: toBlock,
                            eventName: "SubmitVerification",
                        })];
                    case 1:
                        logs = _a.sent();
                        submitEvents = logs.map(function (log) { return ({
                            txHash: log.transactionHash,
                            messageType: log.args.messageType,
                            fid: log.args.fid,
                            verifyAddress: log.args.verifyAddress,
                            publicKey: log.args.publicKey,
                            hash: log.args.hash,
                            signature: log.args.signature,
                            blockNumber: log.blockNumber,
                        }); });
                        submitEvents.forEach(function (event) {
                            _this.emitter.emit(constant_1.EVENT_SUBMIT_VERIFICATION, event);
                        });
                        return [2 /*return*/, submitEvents];
                }
            });
        });
    };
    Indexer.prototype.getLastHead = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.client.publicClient.getBlock()];
            });
        });
    };
    return Indexer;
}());
exports.Indexer = Indexer;
