(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ResultTableManager = /** @class */ (function () {
    function ResultTableManager(table) {
        this.pageSize = 5;
        this.curPage = 1;
        this.storageKey = 'results';
        this.allItems = [];
        this.table = table;
        this.loadFromStorage();
    }
    ResultTableManager.prototype.nextPage = function () {
        if (this.curPage < this.getTotalPages())
            this.curPage++;
        this.renderTable();
        this.updatePaginationButtons();
    };
    ResultTableManager.prototype.clearTable = function () {
        this.allItems = [];
        this.renderTable();
        this.updatePaginationButtons();
        this.saveToStorage();
    };
    ResultTableManager.prototype.previousPage = function () {
        if (this.curPage > 1)
            this.curPage--;
        this.renderTable();
        this.updatePaginationButtons();
    };
    ResultTableManager.prototype.getTotalPages = function () {
        return Math.ceil(this.allItems.length / this.pageSize);
    };
    ResultTableManager.prototype.addData = function (data) {
        this.allItems.push(data);
        this.curPage = this.getTotalPages();
        this.renderTable();
        this.updatePaginationButtons();
        this.saveToStorage();
    };
    ResultTableManager.prototype.getCurrentPageData = function () {
        var startIndex = (this.curPage - 1) * this.pageSize;
        var endIndex = startIndex + this.pageSize;
        return this.allItems.slice(startIndex, endIndex);
    };
    ResultTableManager.prototype.saveToStorage = function () {
        var data = {
            items: this.allItems,
        };
        sessionStorage.setItem(this.storageKey, JSON.stringify(data));
    };
    ResultTableManager.prototype.loadFromStorage = function () {
        var data = sessionStorage.getItem(this.storageKey);
        if (!data)
            return;
        var parsedData = JSON.parse(data);
        this.allItems = parsedData.items;
        this.renderTable();
        this.updatePaginationButtons();
    };
    ResultTableManager.prototype.renderTable = function () {
        var tbody = this.table.querySelector('#result-tbody');
        tbody.innerHTML = '';
        var currentData = this.getCurrentPageData().sort(function (a, b) {
            var dateA = new Date(a.now);
            var dateB = new Date(b.now);
            return dateB.getTime() - dateA.getTime();
        });
        currentData.forEach(function (item) {
            var row = tbody.insertRow();
            row.insertCell(0).textContent = item.x;
            row.insertCell(1).textContent = item.y;
            row.insertCell(2).textContent = item.r;
            row.insertCell(3).textContent = item.hit ? 'Да' : 'Нет';
            row.insertCell(4).textContent = item.now;
            row.insertCell(5).textContent = item.time;
        });
    };
    ResultTableManager.prototype.updatePaginationButtons = function () {
        var totalPages = this.getTotalPages();
        var prevBtn = $("#prev-btn");
        var nextBtn = $("#next-btn");
        var clearBtn = $("#clear-btn");
        if (this.curPage <= 1 || totalPages === 0) {
            prevBtn.prop('disabled', true);
            prevBtn.addClass("disabled");
        }
        else {
            prevBtn.prop('disabled', false);
            prevBtn.removeClass("disabled");
        }
        if (this.curPage >= totalPages || totalPages === 0) {
            nextBtn.prop('disabled', true);
            nextBtn.addClass("disabled");
        }
        else {
            nextBtn.prop('disabled', false);
            nextBtn.removeClass("disabled");
        }
        if (this.allItems.length === 0) {
            clearBtn.prop("disabled", true);
            clearBtn.addClass("disabled");
        }
        else {
            clearBtn.prop("disabled", false);
            clearBtn.removeClass("disabled");
        }
    };
    return ResultTableManager;
}());
exports.default = ResultTableManager;

},{}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SvgManager = /** @class */ (function () {
    function SvgManager(dataManager) {
        this.dataManager = dataManager;
    }
    SvgManager.prototype.drawPoint = function () {
        if (!this.dataManager.isValid()) {
            return;
        }
        var svgCenterX = 250;
        var svgCenterY = 250;
        var coordinateX = svgCenterX + parseFloat(this.dataManager.x) / parseFloat(this.dataManager.r) * 100;
        var coordinateY = svgCenterY - parseFloat(this.dataManager.y) / parseFloat(this.dataManager.r) * 100;
        var point = $("#pointer");
        point.attr('cx', "" + coordinateX);
        point.attr('cy', "" + coordinateY);
        point.attr('visibility', 'visible');
    };
    SvgManager.prototype.initializeSvgClick = function () {
        var _this = this;
        $("svg").on("click", function (event) {
            if (!_this.dataManager.r) {
                alert("Сначала выберите значение R");
                return;
            }
            var svg = event.currentTarget;
            var rect = svg.getBoundingClientRect();
            var svgX = event.clientX - rect.left;
            var svgY = event.clientY - rect.top;
            var svgCenterX = 250;
            var svgCenterY = 250;
            var scale = 100;
            var mathX = (svgX - svgCenterX) / scale * parseFloat(_this.dataManager.r);
            var mathY = (svgCenterY - svgY) / scale * parseFloat(_this.dataManager.r);
            _this.dataManager.x = mathX.toString();
            _this.dataManager.y = mathY.toString();
            _this.drawPoint();
        });
    };
    return SvgManager;
}());
exports.default = SvgManager;

},{}],3:[function(require,module,exports){
"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var App = /** @class */ (function () {
    function App(config, tableManager, dataManager, svgManager) {
        this.config = config;
        this.tableManager = tableManager;
        this.dataManager = dataManager;
        this.svgManager = svgManager;
    }
    App.prototype.initializeListeners = function () {
        this.initializeInputButtons();
        this.initializePointDrawing();
        this.initializeTableButtons();
        this.initializeInputButtonsSelection();
        this.initializeServerRequesting();
        this.svgManager.initializeSvgClick();
    };
    App.prototype.initializeInputButtons = function () {
        var _this = this;
        $("input[name=Y-input]").on("input", function (event) {
            _this.dataManager.y = $(event.target).val();
        });
        $("input[name=X-button]").on("click", function (event) {
            _this.dataManager.x = $(event.target).val();
        });
        $("input[name=R-button]").on("click", function (event) {
            _this.dataManager.r = $(event.target).val();
        });
    };
    App.prototype.initializePointDrawing = function () {
        var _this = this;
        $("input[name=X-button]").on("click", function () { return _this.svgManager.drawPoint(); });
        $("input[name=R-button]").on("click", function () { return _this.svgManager.drawPoint(); });
        $("input[name=Y-input]").on("input", function () { return _this.svgManager.drawPoint(); });
    };
    App.prototype.initializeTableButtons = function () {
        var _this = this;
        $("#prev-btn").on("click", function () { return _this.tableManager.previousPage(); });
        $("#next-btn").on("click", function () { return _this.tableManager.nextPage(); });
        $("#clear-btn").on("click", function () { return _this.tableManager.clearTable(); });
    };
    App.prototype.initializeInputButtonsSelection = function () {
        var _this = this;
        $("input[name=X-button]").on("click", function (event) {
            if ($(event.target).hasClass("selected")) {
                $(event.target).removeClass("selected");
                _this.dataManager.x = null;
            }
            else {
                $("input[name=X-button]").removeClass("selected");
                $(event.target).addClass("selected");
            }
        });
        $("input[name=R-button]").on("click", function (event) {
            if ($(event.target).hasClass("selected")) {
                $(event.target).removeClass("selected");
                _this.dataManager.r = null;
            }
            else {
                $("input[name=R-button]").removeClass("selected");
                $(event.target).addClass("selected");
            }
        });
    };
    App.prototype.initializeServerRequesting = function () {
        var _this = this;
        $("input[name=check-button]").on("click", function () {
            if (!_this.dataManager.isValid()) {
                alert("Некорректные данные");
                return;
            }
            var data = _this.dataManager.getData();
            $.ajax({
                url: _this.config.get("path") + $.param(data),
                type: "POST",
                dataType: "json",
                success: function (response) {
                    if (response.error != null) {
                        alert("Ответ не получен");
                        console.log(response);
                        return;
                    }
                    var rowData = __assign(__assign({}, data), { hit: response.result, now: response.now, time: response.time });
                    _this.tableManager.addData(rowData);
                },
            });
        });
    };
    return App;
}());
exports.default = App;

},{}],4:[function(require,module,exports){
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

},{}],5:[function(require,module,exports){
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

},{}],6:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = require("./app");
var config_1 = require("./config");
var dataManager_1 = require("./dataManager");
var ResultTableManager_1 = require("./ResultTableManager");
var SvgManager_1 = require("./SvgManager");
var config = new config_1.default();
config.set("path", "/calculate?");
// config.set("path", "/fcgi-bin/app.jar?"); // helios
var dataManager = new dataManager_1.default();
var table = document.getElementById("result-table");
var tableManager = new ResultTableManager_1.default(table);
var svgManager = new SvgManager_1.default(dataManager);
new app_1.default(config, tableManager, dataManager, svgManager).initializeListeners();

},{"./ResultTableManager":1,"./SvgManager":2,"./app":3,"./config":4,"./dataManager":5}]},{},[6]);
