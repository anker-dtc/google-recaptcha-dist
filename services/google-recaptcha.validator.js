"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoogleRecaptchaValidator = void 0;
const common_1 = require("@nestjs/common");
const provider_declarations_1 = require("../provider.declarations");
const qs = require("querystring");
const google_recaptcha_network_1 = require("../enums/google-recaptcha-network");
const error_code_1 = require("../enums/error-code");
const google_recaptcha_network_exception_1 = require("../exceptions/google-recaptcha-network.exception");
let GoogleRecaptchaValidator = class GoogleRecaptchaValidator {
    constructor(http, options) {
        this.http = http;
        this.options = options;
        this.defaultNetwork = google_recaptcha_network_1.GoogleRecaptchaNetwork.Google;
        this.headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
    }
    /**
     * @throws GoogleRecaptchaNetworkException
     * @param {VerifyResponseOptions} options
     */
    async validate(options, headers = {}) {
        const result = await this.verifyResponse(options.response, headers);
        if (!this.isUseV3(result)) {
            return result;
        }
        if (!this.isValidAction(result.action, options)) {
            result.success = false;
            result.errors.push(error_code_1.ErrorCode.ForbiddenAction);
        }
        if (!this.isValidScore(result.score, options.score)) {
            result.success = false;
            result.errors.push(error_code_1.ErrorCode.LowScore);
        }
        return result;
    }
    verifyResponse(response, headers = {}) {
        let secret = this.options.secretKey;
        var global;
        if (global.googleRecaptchaSecretMap && headers['x-recaptcha-sitekey']) {
            let val = global.googleRecaptchaSecretMap[headers['x-recaptcha-sitekey']];
            if (val) {
                secret = val;
            }
        }
        console.log(`verifyResponse ${secret}`);
        const data = qs.stringify({ secret, response });
        const url = this.options.network || this.defaultNetwork;
        const config = {
            headers: this.headers,
        };
        if (this.options.agent) {
            config.httpsAgent = this.options.agent;
        }
        return this.http.post(url, data, config)
            .toPromise()
            .then(res => res.data)
            .then(result => (Object.assign(Object.assign({}, result), { errors: result['error-codes'] || [] })))
            .then(result => {
            delete result['error-codes'];
            return result;
        })
            .catch((err) => {
            const networkErrorCode = err.isAxiosError && err.code;
            if (networkErrorCode) {
                throw new google_recaptcha_network_exception_1.GoogleRecaptchaNetworkException(networkErrorCode);
            }
            return {
                success: false,
                errors: [error_code_1.ErrorCode.UnknownError],
            };
        });
    }
    isValidAction(action, options) {
        if (options.action) {
            return options.action === action;
        }
        return this.options.actions
            ? this.options.actions.includes(action)
            : true;
    }
    isValidScore(score, validator) {
        const finalValidator = validator || this.options.score;
        if (finalValidator) {
            if (typeof finalValidator === 'function') {
                return finalValidator(score);
            }
            return score >= finalValidator;
        }
        return true;
    }
    isUseV3(v) {
        return ('score' in v && typeof v['score'] === 'number') &&
            ('action' in v && typeof v['action'] === 'string');
    }
};
GoogleRecaptchaValidator = __decorate([
    common_1.Injectable(),
    __param(0, common_1.Inject(provider_declarations_1.RECAPTCHA_HTTP_SERVICE)),
    __param(1, common_1.Inject(provider_declarations_1.RECAPTCHA_OPTIONS)),
    __metadata("design:paramtypes", [common_1.HttpService, Object])
], GoogleRecaptchaValidator);
exports.GoogleRecaptchaValidator = GoogleRecaptchaValidator;
//# sourceMappingURL=google-recaptcha.validator.js.map