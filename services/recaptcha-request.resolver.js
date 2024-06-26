"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecaptchaRequestResolver = void 0;
const common_1 = require("@nestjs/common");
const application_type_1 = require("../enums/application-type");
const load_module_1 = require("../helpers/load-module");
let RecaptchaRequestResolver = class RecaptchaRequestResolver {
    resolve(context) {
        var _a, _b, _c;
        const contextType = context.getType();
        switch (contextType) {
            case 'http':
                return context.switchToHttp().getRequest();
            case 'graphql':
                const graphqlModule = (0, load_module_1.loadModule)('@nestjs/graphql', true);
                return (_c = (_b = (_a = graphqlModule.GqlExecutionContext.create(context).getContext().req) === null || _a === void 0 ? void 0 : _a.connection) === null || _b === void 0 ? void 0 : _b._httpMessage) === null || _c === void 0 ? void 0 : _c.req;
            default:
                throw new Error(`Unsupported request type '${contextType}'.`);
        }
    }
    /**
     * @deprecated
     */
    resolveByApplicationType(context, type) {
        var _a, _b, _c;
        switch (type) {
            case application_type_1.ApplicationType.Rest:
                return context.switchToHttp().getRequest();
            case application_type_1.ApplicationType.GraphQL:
                const graphqlModule = (0, load_module_1.loadModule)('@nestjs/graphql', true);
                return (_c = (_b = (_a = graphqlModule.GqlExecutionContext.create(context).getContext().req) === null || _a === void 0 ? void 0 : _a.connection) === null || _b === void 0 ? void 0 : _b._httpMessage) === null || _c === void 0 ? void 0 : _c.req;
            default:
                throw new Error(`Unsupported request type '${type}'.`);
        }
    }
};
RecaptchaRequestResolver = __decorate([
    (0, common_1.Injectable)()
], RecaptchaRequestResolver);
exports.RecaptchaRequestResolver = RecaptchaRequestResolver;
//# sourceMappingURL=recaptcha-request.resolver.js.map