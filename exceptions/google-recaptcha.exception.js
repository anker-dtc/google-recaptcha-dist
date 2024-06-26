"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoogleRecaptchaException = void 0;
const common_1 = require("@nestjs/common");
const error_code_1 = require("../enums/error-code");
class GoogleRecaptchaException extends common_1.HttpException {
    constructor(errorCodes, errorMessage) {
        super(errorMessage || GoogleRecaptchaException.getErrorMessage(errorCodes[0]), GoogleRecaptchaException.getErrorStatus(errorCodes[0]));
        this.errorCodes = errorCodes;
    }
    static getErrorMessage(errorCode) {
        switch (errorCode) {
            case error_code_1.ErrorCode.InvalidInputResponse:
                return 'The response parameter is invalid or malformed.';
            case error_code_1.ErrorCode.MissingInputResponse:
                return 'The response parameter is missing.';
            case error_code_1.ErrorCode.TimeoutOrDuplicate:
                return 'The response is no longer valid: either is too old or has been used previously.';
            case error_code_1.ErrorCode.InvalidInputSecret:
            case error_code_1.ErrorCode.MissingInputSecret:
                return 'Invalid module configuration. Please check public-secret keys.';
            case error_code_1.ErrorCode.InvalidKeys:
                return 'Recaptcha token was signed by invalid api key.';
            case error_code_1.ErrorCode.LowScore:
                return 'Low recaptcha score.';
            case error_code_1.ErrorCode.ForbiddenAction:
                return 'Forbidden recaptcha action.';
            case error_code_1.ErrorCode.UnknownError:
            case error_code_1.ErrorCode.BadRequest:
            default:
                return 'Unexpected error. Please submit issue to @nestlab/google-recaptcha.';
        }
    }
    static getErrorStatus(errorCode) {
        return errorCode === error_code_1.ErrorCode.InvalidInputResponse ||
            errorCode === error_code_1.ErrorCode.MissingInputResponse ||
            errorCode === error_code_1.ErrorCode.TimeoutOrDuplicate ||
            errorCode === error_code_1.ErrorCode.ForbiddenAction ||
            errorCode === error_code_1.ErrorCode.LowScore ||
            errorCode === error_code_1.ErrorCode.InvalidKeys
            ? common_1.HttpStatus.BAD_REQUEST
            : common_1.HttpStatus.INTERNAL_SERVER_ERROR;
    }
}
exports.GoogleRecaptchaException = GoogleRecaptchaException;
//# sourceMappingURL=google-recaptcha.exception.js.map