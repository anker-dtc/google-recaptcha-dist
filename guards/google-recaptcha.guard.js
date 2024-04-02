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
exports.GoogleRecaptchaGuard = void 0;
const common_1 = require("@nestjs/common");
const google_recaptcha_validator_1 = require("../services/google-recaptcha.validator");
const provider_declarations_1 = require("../provider.declarations");
const google_recaptcha_exception_1 = require("../exceptions/google-recaptcha.exception");
const core_1 = require("@nestjs/core");
const recaptcha_request_resolver_1 = require("../services/recaptcha-request.resolver");
let GoogleRecaptchaGuard = class GoogleRecaptchaGuard {
    constructor(validator, reflector, requestResolver, options) {
        this.validator = validator;
        this.reflector = reflector;
        this.requestResolver = requestResolver;
        this.options = options;
    }
    async canActivate(context) {
        const request = this.options.applicationType
            ? this.requestResolver.resolveByApplicationType(context, this.options.applicationType)
            : this.requestResolver.resolve(context);
        const skip = typeof this.options.skipIf === 'function'
            ? await this.options.skipIf(request)
            : !!this.options.skipIf;
        if (skip) {
            return true;
        }
        const options = this.reflector.get(provider_declarations_1.RECAPTCHA_VALIDATION_OPTIONS, context.getHandler());
        const response = (options === null || options === void 0 ? void 0 : options.response) ? await (options === null || options === void 0 ? void 0 : options.response(request))
            : await this.options.response(request);
        const score = (options === null || options === void 0 ? void 0 : options.score) || this.options.score;
        const action = options === null || options === void 0 ? void 0 : options.action;
        request.recaptchaValidationResult = await this.validator.validate({ response, score, action }, request.headers);
        if (request.recaptchaValidationResult.success) {
            return true;
        }
        throw new google_recaptcha_exception_1.GoogleRecaptchaException(request.recaptchaValidationResult.errors);
    }
};
GoogleRecaptchaGuard = __decorate([
    common_1.Injectable(),
    __param(3, common_1.Inject(provider_declarations_1.RECAPTCHA_OPTIONS)),
    __metadata("design:paramtypes", [google_recaptcha_validator_1.GoogleRecaptchaValidator,
        core_1.Reflector,
        recaptcha_request_resolver_1.RecaptchaRequestResolver, Object])
], GoogleRecaptchaGuard);
exports.GoogleRecaptchaGuard = GoogleRecaptchaGuard;
//# sourceMappingURL=google-recaptcha.guard.js.map