"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Config = /** @class */ (function () {
    function Config(state) {
        if (state === void 0) { state = {}; }
        this.state = state;
    }
    Config.prototype.set = function (key, value) {
        this.state[key] = value;
    };
    Config.prototype.get = function (key) {
        return this.state[key];
    };
    return Config;
}());
exports.default = Config;
