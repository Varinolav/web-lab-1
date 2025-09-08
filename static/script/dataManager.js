"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DataManager = /** @class */ (function () {
    function DataManager() {
    }
    Object.defineProperty(DataManager.prototype, "r", {
        get: function () {
            return this._r;
        },
        set: function (value) {
            this._r = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DataManager.prototype, "x", {
        get: function () {
            return this._x;
        },
        set: function (value) {
            this._x = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DataManager.prototype, "y", {
        get: function () {
            return this._y;
        },
        set: function (value) {
            this._y = value;
        },
        enumerable: false,
        configurable: true
    });
    DataManager.prototype.getData = function () {
        return { x: this.x, y: this.y, r: this.r };
    };
    DataManager.prototype.isValid = function () {
        return this.x !== null && this.r !== null && this.y != null && this.y != "";
    };
    return DataManager;
}());
exports.default = DataManager;
