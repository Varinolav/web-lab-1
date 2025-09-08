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
var x, y, r;
var table = document.getElementById("result-table");
var PagePaginator = /** @class */ (function () {
    function PagePaginator(table) {
        this.pageSize = 5;
        this.curPage = 1;
        this.allItems = [];
        this.table = table;
    }
    PagePaginator.prototype.nextPage = function () {
        if (this.curPage < this.getTotalPages())
            this.curPage++;
        this.renderTable();
    };
    PagePaginator.prototype.previousPage = function () {
        if (this.curPage > 1)
            this.curPage--;
        this.renderTable();
    };
    PagePaginator.prototype.getTotalPages = function () {
        return Math.ceil(this.allItems.length / this.pageSize);
    };
    PagePaginator.prototype.addData = function (data) {
        this.allItems.push(data);
        this.curPage = this.getTotalPages();
        this.renderTable();
    };
    PagePaginator.prototype.getCurrentPageData = function () {
        var startIndex = (this.curPage - 1) * this.pageSize;
        var endIndex = startIndex + this.pageSize;
        return this.allItems.slice(startIndex, endIndex);
    };
    PagePaginator.prototype.renderTable = function () {
        var _this = this;
        var headerRow = this.table.rows[0];
        this.table.innerHTML = '';
        this.table.appendChild(headerRow);
        var currentData = this.getCurrentPageData();
        currentData.forEach(function (item) {
            var row = _this.table.insertRow();
            row.insertCell(0).textContent = item.x;
            row.insertCell(1).textContent = item.y;
            row.insertCell(2).textContent = item.r;
            row.insertCell(3).textContent = item.hit ? 'Да' : 'Нет';
            row.insertCell(4).textContent = item.now;
            row.insertCell(5).textContent = item.time;
        });
    };
    return PagePaginator;
}());
function isValid(x, y, r) {
    return x !== null && r !== null && y != null;
}
$("input[name=X-button]").on("click", drawPoint);
$("input[name=R-button]").on("click", drawPoint);
$("input[name=Y-input]").on("input", drawPoint);
function drawPoint() {
    console.log(1221);
    if (!isValid(x, y, r)) {
        return;
    }
    var svgCenterX = 250;
    var svgCenterY = 250;
    var coordinateX = svgCenterX + parseFloat(x) / parseFloat(r) * 100;
    var coordinateY = svgCenterY - parseFloat(y) / parseFloat(r) * 100;
    var point = $("#pointer");
    point.attr('cx', "" + coordinateX);
    point.attr('cy', "" + coordinateY);
    point.attr('visibility', 'visible');
}
jQuery(function () {
    $(".input-btn").on("click", function () {
        if ($(this).hasClass("selected")) {
            $(this).removeClass("selected");
            if ($(this).attr("name") === "X-button") {
                x = null;
            }
            if ($(this).attr("name") === "R-button") {
                r = null;
            }
        }
        else {
            $(".input-btn").removeClass("selected");
            $(this).addClass("selected");
        }
    });
});
function setX(xInput) {
    x = xInput;
}
$("input[name=Y-input]").on("input", function () {
    y = $(this).val();
});
function setR(rInput) {
    r = rInput;
}
var paginator = new PagePaginator(table);
$("#prev-btn").on("click", function () { return paginator.previousPage(); });
$("#next-btn").on("click", function () { return paginator.nextPage(); });
$("input[name=check-button]").on("click", function (e) {
    if (!isValid(x, y, r)) {
        alert("Некорректные данные");
        return;
    }
    var data = {
        "x": x,
        "y": y,
        "r": r
    };
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
            paginator.addData(rowData);
        },
    });
});
function get() {
    console.log(x);
    console.log(y);
    console.log(r);
}
