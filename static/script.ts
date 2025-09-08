"use strict"

import ClickEvent = JQuery.ClickEvent;

let x: string, y: string, r: string;
const table: HTMLTableElement = document.getElementById("result-table") as HTMLTableElement;

class PagePaginator {
    private pageSize: number = 5;
    private curPage: number = 1;
    private allItems: any[];
    private table: HTMLTableElement;

    constructor(table: HTMLTableElement) {
        this.allItems = [];
        this.table = table;
    }

    public nextPage(): void {
        if (this.curPage < this.getTotalPages()) this.curPage++;
        this.renderTable();
    }

    public previousPage(): void {
        if (this.curPage > 1) this.curPage--;
        this.renderTable();
    }

    private getTotalPages(): number {
        return Math.ceil(this.allItems.length / this.pageSize);
    }

    public addData(data: object): void {
        this.allItems.push(data);
        this.curPage = this.getTotalPages();
        this.renderTable();
    }

    private getCurrentPageData(): any[] {
        const startIndex = (this.curPage - 1) * this.pageSize;
        const endIndex = startIndex + this.pageSize;
        return this.allItems.slice(startIndex, endIndex);
    }

    private renderTable(): void {
        const headerRow = this.table.rows[0];
        this.table.innerHTML = '';
        this.table.appendChild(headerRow);

        const currentData = this.getCurrentPageData();
        currentData.forEach(item => {
            const row = this.table.insertRow();
            row.insertCell(0).textContent = item.x;
            row.insertCell(1).textContent = item.y;
            row.insertCell(2).textContent = item.r;
            row.insertCell(3).textContent = item.hit ? 'Да' : 'Нет';
            row.insertCell(4).textContent = item.now;
            row.insertCell(5).textContent = item.time;
        });
    }
}

function isValid(x: string, y: string, r: string): boolean {
    return x !== null && r !== null && y != null;
}



$("input[name=X-button]").on("click", drawPoint)
$("input[name=R-button]").on("click", drawPoint)
$("input[name=Y-input]").on("input", drawPoint)

function drawPoint(): void {
    console.log(1221)
    if (!isValid(x, y, r)) {
        return;
    }

    const svgCenterX: number = 250;
    const svgCenterY: number = 250;

    const coordinateX = svgCenterX + parseFloat(x) / parseFloat(r) * 100;
    const coordinateY = svgCenterY - parseFloat(y) / parseFloat(r) * 100;

    let point = $("#pointer");
    point.attr('cx', "" + coordinateX);
    point.attr('cy', "" + coordinateY);
    point.attr('visibility', 'visible');
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

function setX(xInput: string): void {
    x = xInput;
}

$("input[name=Y-input]").on("input", function (): void {
    y = $(this).val() as string;
});

function setR(rInput: string): void {
    r = rInput;
}

const paginator: PagePaginator = new PagePaginator(table);
$("#prev-btn").on("click", () => paginator.previousPage());
$("#next-btn").on("click", () => paginator.nextPage());
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

            const rowData: object = {...data, hit: response.result, now: response.now, time: response.time};
            paginator.addData(rowData);
        },
    });
});


function get() {
    console.log(x);
    console.log(y);
    console.log(r);
}

