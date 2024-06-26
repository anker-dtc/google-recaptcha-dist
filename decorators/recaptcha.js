"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GOOGLE_RECAPTCHA_SECRET_MAP = exports.Recaptcha = void 0;
const common_1 = require("@nestjs/common");
const google_recaptcha_guard_1 = require("../guards/google-recaptcha.guard");
const set_recaptcha_options_1 = require("./set-recaptcha-options");
function Recaptcha(options) {
    return (0, common_1.applyDecorators)((0, set_recaptcha_options_1.SetRecaptchaOptions)(options), (0, common_1.UseGuards)(google_recaptcha_guard_1.GoogleRecaptchaGuard));
}
exports.Recaptcha = Recaptcha;
exports.GOOGLE_RECAPTCHA_SECRET_MAP = {};
//# sourceMappingURL=recaptcha.js.map