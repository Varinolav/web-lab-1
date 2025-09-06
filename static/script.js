"use strict";
var x, y, r;
var table = document.getElementById("result-table");
function setX(xInput) {
    x = xInput;
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
$("input[name=Y-input]").on("input", function () {
    y = $(this).val();
});
function setR(rInput) {
    r = rInput;
}
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
            var row = table.insertRow(1);
            var rowX = row.insertCell(0);
            var rowY = row.insertCell(1);
            var rowR = row.insertCell(2);
            var rowResult = row.insertCell(3);
            var rowNow = row.insertCell(4);
            var rowTime = row.insertCell(5);
            var hitStatus = response.result ? "Да" : "Нет";
            rowX.textContent = data.x;
            rowY.textContent = data.y;
            rowR.textContent = data.r;
            rowResult.textContent = hitStatus;
            rowNow.textContent = response.now;
            rowTime.textContent = response.time;
        },
    });
});
function isValid(x, y, r) {
    return x !== null && r !== null && y != null;
}
var PagePaginator = /** @class */ (function () {
    function PagePaginator() {
    }
    return PagePaginator;
}());
