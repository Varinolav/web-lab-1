"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = require("./app");
var config_1 = require("./config");
var dataManager_1 = require("./dataManager");
var ResultTableManager_1 = require("./ResultTableManager");
var svgManager_1 = require("./svgManager");
var config = new config_1.default();
config.set("path", "/calculate?");
// config.set("path", "/fcgi-bin/app.jar?"); // helios
var dataManager = new dataManager_1.default();
var table = document.getElementById("result-table");
var tableManager = new ResultTableManager_1.default(table);
var svgManager = new svgManager_1.default(dataManager);
new app_1.default(config, tableManager, dataManager, svgManager).initializeListeners();
