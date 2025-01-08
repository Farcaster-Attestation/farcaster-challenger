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
exports.Verify = void 0;
var constant_1 = require("../constant");
var log_1 = require("../log");
var core_1 = require("@farcaster/core");
var Verify = /** @class */ (function () {
    function Verify(client, emitter) {
        this.client = client;
        this.emitter = emitter;
    }
    Verify.prototype.handleEvent = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                this.emitter.on(constant_1.EVENT_SUBMIT_VERIFICATION, function (data) { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, this.processVerification(data)];
                            case 1:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                }); });
                return [2 /*return*/];
            });
        });
    };
    Verify.prototype.processVerification = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, verified, verified, e_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 11, , 12]);
                        log_1.logger.info("Processing verification: ".concat(JSON.stringify(data)));
                        _a = data.messageType;
                        switch (_a) {
                            case core_1.MessageType.VERIFICATION_ADD_ETH_ADDRESS: return [3 /*break*/, 1];
                            case core_1.MessageType.VERIFICATION_REMOVE: return [3 /*break*/, 5];
                        }
                        return [3 /*break*/, 9];
                    case 1: return [4 /*yield*/, this.client.verifyAdd(BigInt(data.fid), data.verifyAddress, data.publicKey, data.signature)];
                    case 2:
                        verified = _b.sent();
                        log_1.logger.info("Verification add address: ".concat(verified));
                        if (!verified) return [3 /*break*/, 4];
                        // call the challengeAdd function
                        return [4 /*yield*/, this.client.challengeAdd(BigInt(data.fid), data.verifyAddress, data.publicKey, data.signature)];
                    case 3:
                        // call the challengeAdd function
                        _b.sent();
                        _b.label = 4;
                    case 4: return [3 /*break*/, 10];
                    case 5: return [4 /*yield*/, this.client.verifyRemove(BigInt(data.fid).valueOf(), data.verifyAddress, data.publicKey, data.signature)];
                    case 6:
                        verified = _b.sent();
                        log_1.logger.info("Verification remove: ".concat(verified));
                        if (!verified) return [3 /*break*/, 8];
                        // call the challengeRemove function
                        return [4 /*yield*/, this.client.challengeRemove(BigInt(data.fid).valueOf(), data.verifyAddress, data.publicKey, data.signature)];
                    case 7:
                        // call the challengeRemove function
                        _b.sent();
                        _b.label = 8;
                    case 8: return [3 /*break*/, 10];
                    case 9:
                        log_1.logger.error("Unknown message type: ".concat(data.messageType));
                        return [2 /*return*/];
                    case 10: return [3 /*break*/, 12];
                    case 11:
                        e_1 = _b.sent();
                        log_1.logger.error("Error processing verification: ".concat(e_1));
                        return [3 /*break*/, 12];
                    case 12: return [2 /*return*/];
                }
            });
        });
    };
    return Verify;
}());
exports.Verify = Verify;
