"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadModule = void 0;
const common_1 = require("@nestjs/common");
function loadModule(moduleName, logError = false) {
    try {
        return require(moduleName);
    }
    catch (e) {
        if (logError) {
            common_1.Logger.error(`Module '${moduleName}' not found. \nPotential solution npm i  ${moduleName}`);
        }
        throw e;
    }
}
exports.loadModule = loadModule;
//# sourceMappingURL=load-module.js.map