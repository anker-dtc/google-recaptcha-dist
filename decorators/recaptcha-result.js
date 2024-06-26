"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecaptchaResult = void 0;
const common_1 = require("@nestjs/common");
const load_module_1 = require("../helpers/load-module");
exports.RecaptchaResult = (0, common_1.createParamDecorator)((data, context) => {
    var _a, _b, _c, _d;
    switch (context.getType()) {
        case 'http':
            return context.switchToHttp().getRequest().recaptchaValidationResult;
        case 'graphql':
            const graphqlModule = (0, load_module_1.loadModule)('@nestjs/graphql', true);
            return (_d = (_c = (_b = (_a = graphqlModule.GqlExecutionContext.create(context).getContext().req) === null || _a === void 0 ? void 0 : _a.connection) === null || _b === void 0 ? void 0 : _b._httpMessage) === null || _c === void 0 ? void 0 : _c.req) === null || _d === void 0 ? void 0 : _d.recaptchaValidationResult;
        default:
            return null;
    }
});
//# sourceMappingURL=recaptcha-result.js.map