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
