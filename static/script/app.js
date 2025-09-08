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
        $(".input-btn").on("click", function (event) {
            if ($(event.target).hasClass("selected")) {
                $(event.target).removeClass("selected");
                if ($(event.target).attr("name") === "X-button") {
                    _this.dataManager.x = null;
                }
                if ($(event.target).attr("name") === "R-button") {
                    _this.dataManager.r = null;
                }
            }
            else {
                $(".input-btn").removeClass("selected");
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
                url: "/calculate?" + $.param(data),
                type: "POST",
                dataType: "json",
                success: function (response) {
                    if (response.error != null) {
                        alert("Ответ не получен");
                        console.log(response);
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
