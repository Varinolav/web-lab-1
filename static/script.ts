"use strict"

import ClickEvent = JQuery.ClickEvent;

let x: string, y: string, r: string;
const table: HTMLTableElement = document.getElementById("result-table") as HTMLTableElement;


function setX(xInput: string): void {
    x = xInput;
}

jQuery(function (): void {
    $(".input-btn").on("click", function (): void {
        if ($(this).hasClass("selected")) {
            $(this).removeClass("selected");
            if ($(this).attr("name") === "X-button") {
                x = null;
            }
            if ($(this).attr("name") === "R-button") {
                r = null;
            }
        } else {
            $(".input-btn").removeClass("selected");
            $(this).addClass("selected");
        }
    });
});

$("input[name=Y-input]").on("input", function (): void {
    y = $(this).val() as string;
});

function setR(rInput: string): void {
    r = rInput;
}

$("input[name=check-button]").on("click", function (e: ClickEvent<HTMLElement>): void {
    if (!isValid(x, y, r)) {
        alert("Некорректные данные");
        return;
    }

    let data = {
        "x": x,
        "y": y,
        "r": r
    }
    $.ajax({
        url: "/calculate?" + $.param(data),
        type: "POST",
        dataType: "json",
        success: function (response): void {
            if (response.error != null) {
                alert("Ответ не получен")
                console.log(response)
            }

            const row: HTMLTableRowElement = table.insertRow(1);
            const rowX: HTMLTableCellElement = row.insertCell(0);
            const rowY: HTMLTableCellElement = row.insertCell(1);
            const rowR: HTMLTableCellElement = row.insertCell(2);
            const rowResult: HTMLTableCellElement = row.insertCell(3);
            const rowNow: HTMLTableCellElement = row.insertCell(4);
            const rowTime: HTMLTableCellElement = row.insertCell(5);
            let hitStatus: string = response.result ? "Да" : "Нет";
            rowX.textContent = data.x;
            rowY.textContent = data.y;
            rowR.textContent = data.r;
            rowResult.textContent = hitStatus;
            rowNow.textContent = response.now;
            rowTime.textContent = response.time;
        },

    });
});

function isValid(x: string, y: string, r: string): boolean {
    return x !== null && r !== null && y != null;
}

class PagePaginator {

}