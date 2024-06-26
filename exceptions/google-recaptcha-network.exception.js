"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoogleRecaptchaNetworkException = void 0;
const google_recaptcha_exception_1 = require("./google-recaptcha.exception");
const error_code_1 = require("../enums/error-code");
class GoogleRecaptchaNetworkException extends google_recaptcha_exception_1.GoogleRecaptchaException {
    constructor(networkErrorCode) {
        super([error_code_1.ErrorCode.NetworkError], networkErrorCode ? `Network error '${networkErrorCode}'.` : 'Unknown network error.');
        this.networkErrorCode = networkErrorCode;
    }
}
exports.GoogleRecaptchaNetworkException = GoogleRecaptchaNetworkException;
//# sourceMappingURL=google-recaptcha-network.exception.js.map