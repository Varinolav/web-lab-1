export default class ResultTableManager {
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
        this.updatePaginationButtons();
    }

    public clearTable(): void {
        this.allItems = [];
        this.renderTable();
        this.updatePaginationButtons();
    }

    public previousPage(): void {
        if (this.curPage > 1) this.curPage--;
        this.renderTable();
        this.updatePaginationButtons();
    }

    private getTotalPages(): number {
        return Math.ceil(this.allItems.length / this.pageSize);
    }

    public addData(data: object): void {
        this.allItems.push(data);
        this.curPage = this.getTotalPages();
        this.renderTable();
        this.updatePaginationButtons();
    }

    private getCurrentPageData(): any[] {
        const startIndex = (this.curPage - 1) * this.pageSize;
        const endIndex = startIndex + this.pageSize;
        return this.allItems.slice(startIndex, endIndex);
    }

    private renderTable(): void {
        const tbody = this.table.querySelector('#result-tbody') as HTMLTableSectionElement;
        tbody.innerHTML = '';

        const currentData = this.getCurrentPageData();
        currentData.forEach(item => {
            const row = tbody.insertRow();
            row.insertCell(0).textContent = item.x;
            row.insertCell(1).textContent = item.y;
            row.insertCell(2).textContent = item.r;
            row.insertCell(3).textContent = item.hit ? 'Да' : 'Нет';
            row.insertCell(4).textContent = item.now;
            row.insertCell(5).textContent = item.time;
        });
    }

    private updatePaginationButtons(): void {
        const totalPages = this.getTotalPages();
        const prevBtn = $("#prev-btn");
        const nextBtn = $("#next-btn");
        const clearBtn = $("#clear-btn");

        if (this.curPage <= 1 || totalPages === 0) {
            prevBtn.prop('disabled', true);
            prevBtn.addClass("disabled");
        } else {
            prevBtn.prop('disabled', false);
            prevBtn.removeClass("disabled");
        }

        if (this.curPage >= totalPages || totalPages === 0) {
            nextBtn.prop('disabled', true);
            nextBtn.addClass("disabled");
        } else {
            nextBtn.prop('disabled', false);
            nextBtn.removeClass("disabled");
        }

        if (this.allItems.length === 0) {
            clearBtn.prop("disabled", true);
            clearBtn.addClass("disabled");
        } else {
            clearBtn.prop("disabled", false);
            clearBtn.removeClass("disabled");
        }
    }
}
