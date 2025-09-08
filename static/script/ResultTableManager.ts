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
    }

    public clearTable(): void {
        this.allItems = [];
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
