"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoogleRecaptchaModule = void 0;
const google_recaptcha_guard_1 = require("./guards/google-recaptcha.guard");
const google_recaptcha_validator_1 = require("./services/google-recaptcha.validator");
const provider_declarations_1 = require("./provider.declarations");
const recaptcha_request_resolver_1 = require("./services/recaptcha-request.resolver");
const load_module_1 = require("./helpers/load-module");
const core_1 = require("@nestjs/core");
const axios = require("axios");
class GoogleRecaptchaModule {
    static forRoot(options) {
        const providers = [
            google_recaptcha_guard_1.GoogleRecaptchaGuard,
            google_recaptcha_validator_1.GoogleRecaptchaValidator,
            recaptcha_request_resolver_1.RecaptchaRequestResolver,
            {
                provide: provider_declarations_1.RECAPTCHA_OPTIONS,
                useValue: options,
            },
        ];
        const httpModule = this.resolveHttpModule();
        const internalProviders = [
            core_1.Reflector,
            {
                provide: provider_declarations_1.RECAPTCHA_HTTP_SERVICE,
                useFactory: (axiosInstance) => new httpModule.HttpService(axiosInstance),
                inject: [
                    provider_declarations_1.RECAPTCHA_AXIOS_INSTANCE,
                ],
            },
            {
                provide: provider_declarations_1.RECAPTCHA_AXIOS_INSTANCE,
                useFactory: () => axios.default.create(this.transformAxiosConfig(options.axiosConfig)),
            },
        ];
        return {
            global: true,
            module: GoogleRecaptchaModule,
            imports: [
                httpModule.HttpModule,
            ],
            providers: providers.concat(internalProviders),
            exports: providers,
        };
    }
    static forRootAsync(options) {
        const providers = [
            google_recaptcha_guard_1.GoogleRecaptchaGuard,
            google_recaptcha_validator_1.GoogleRecaptchaValidator,
            recaptcha_request_resolver_1.RecaptchaRequestResolver,
            ...this.createAsyncProviders(options)
        ];
        const httpModule = this.resolveHttpModule();
        const internalProviders = [
            core_1.Reflector,
            {
                provide: provider_declarations_1.RECAPTCHA_HTTP_SERVICE,
                useFactory: (axiosInstance) => new httpModule.HttpService(axiosInstance),
                inject: [
                    provider_declarations_1.RECAPTCHA_AXIOS_INSTANCE,
                ],
            },
            {
                provide: provider_declarations_1.RECAPTCHA_AXIOS_INSTANCE,
                useFactory: (options) => {
                    const transformedAxiosConfig = this.transformAxiosConfig(options.axiosConfig);
                    return axios.default.create(transformedAxiosConfig);
                },
                inject: [
                    provider_declarations_1.RECAPTCHA_OPTIONS,
                ],
            },
        ];
        return {
            global: true,
            module: GoogleRecaptchaModule,
            imports: [
                ...options.imports || [],
                httpModule.HttpModule,
            ],
            providers: providers.concat(internalProviders),
            exports: providers,
        };
    }
    static resolveHttpModule() {
        try {
            return load_module_1.loadModule('@nestjs/axios');
        }
        catch (e) {
            return load_module_1.loadModule('@nestjs/common');
        }
    }
    static transformAxiosConfig(axiosConfig) {
        const _a = axiosConfig || {}, { baseURL, url, responseType, method, transformRequest, transformResponse, paramsSerializer, validateStatus, data, adapter } = _a, config = __rest(_a, ["baseURL", "url", "responseType", "method", "transformRequest", "transformResponse", "paramsSerializer", "validateStatus", "data", "adapter"]);
        return config;
    }
    static createAsyncProviders(options) {
        const providers = [this.createAsyncOptionsProvider(options)];
        if (options.useClass) {
            providers.push({
                provide: options.useClass,
                useClass: options.useClass,
            });
        }
        return providers;
    }
    static createAsyncOptionsProvider(options) {
        if (options.useFactory) {
            return {
                provide: provider_declarations_1.RECAPTCHA_OPTIONS,
                useFactory: options.useFactory,
                inject: options.inject || [],
            };
        }
        return {
            provide: provider_declarations_1.RECAPTCHA_OPTIONS,
            useFactory: (optionsFactory) => {
                if (!this.isGoogleRecaptchaFactory(optionsFactory)) {
                    throw new Error('Factory must be implement \'GoogleRecaptchaOptionsFactory\' interface.');
                }
                return optionsFactory.createGoogleRecaptchaOptions();
            },
            inject: [options.useExisting || options.useClass],
        };
    }
    static isGoogleRecaptchaFactory(object) {
        return !!object && typeof object.createGoogleRecaptchaOptions === 'function';
    }
}
exports.GoogleRecaptchaModule = GoogleRecaptchaModule;
//# sourceMappingURL=google-recaptcha.module.js.map