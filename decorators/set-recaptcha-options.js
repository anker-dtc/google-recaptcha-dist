"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SetRecaptchaOptions = void 0;
const common_1 = require("@nestjs/common");
const provider_declarations_1 = require("../provider.declarations");
function SetRecaptchaOptions(options) {
    return common_1.SetMetadata(provider_declarations_1.RECAPTCHA_VALIDATION_OPTIONS, options);
}
exports.SetRecaptchaOptions = SetRecaptchaOptions;
//# sourceMappingURL=set-recaptcha-options.js.map