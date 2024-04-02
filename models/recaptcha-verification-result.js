"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecaptchaVerificationResult = void 0;
class RecaptchaVerificationResult {
    constructor(result) {
        this.action = result.action;
        this.score = result.score;
        this.hostname = result.hostname;
    }
}
exports.RecaptchaVerificationResult = RecaptchaVerificationResult;
//# sourceMappingURL=recaptcha-verification-result.js.map