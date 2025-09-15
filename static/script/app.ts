import Config from "./config";
import ResultTableManager from "./ResultTableManager";
import DataManager from "./dataManager";
import svgManager from "./svgManager";

export default class App {
    private config: Config;
    private tableManager: ResultTableManager;
    private dataManager: DataManager;
    private svgManager: svgManager;


    constructor(config: Config, tableManager: ResultTableManager, dataManager: DataManager, svgManager: svgManager) {
        this.config = config;
        this.tableManager = tableManager;
        this.dataManager = dataManager;
        this.svgManager = svgManager;
    }

    public initializeListeners(): void {
        this.initializeInputButtons();
        this.initializePointDrawing();
        this.initializeTableButtons();
        this.initializeInputButtonsSelection();
        this.initializeServerRequesting();
        this.svgManager.intializeSvgClick();
    }

    private initializeInputButtons() {
        $("input[name=Y-input]").on("input", (event): void => {
            this.dataManager.y = $(event.target).val() as string;
        });

        $("input[name=X-button]").on("click", (event): void => {
            this.dataManager.x = $(event.target).val() as string;
        });

        $("input[name=R-button]").on("click", (event): void => {
            this.dataManager.r = $(event.target).val() as string;
        });
    }

    private initializePointDrawing(): void {
        $("input[name=X-button]").on("click", () => this.svgManager.drawPoint());
        $("input[name=R-button]").on("click", () => this.svgManager.drawPoint());
        $("input[name=Y-input]").on("input", () => this.svgManager.drawPoint());
    }

    private initializeTableButtons(): void {
        $("#prev-btn").on("click", () => this.tableManager.previousPage());
        $("#next-btn").on("click", () => this.tableManager.nextPage());
        $("#clear-btn").on("click", () => this.tableManager.clearTable());
    }

    private initializeInputButtonsSelection() {
        $("input[name=X-button]").on("click", (event): void => {

            if ($(event.target).hasClass("selected")) {
                $(event.target).removeClass("selected");
                this.dataManager.x = null;
            } else {
                $("input[name=X-button]").removeClass("selected");
                $(event.target).addClass("selected");
            }
        });
        $("input[name=R-button]").on("click", (event): void => {
            if ($(event.target).hasClass("selected")) {
                $(event.target).removeClass("selected");
                this.dataManager.r = null;
            } else {
                $("input[name=R-button]").removeClass("selected");
                $(event.target).addClass("selected");
            }
        });
    }

    private initializeServerRequesting(): void {
        $("input[name=check-button]").on("click", (): void => {
            if (!this.dataManager.isValid()) {
                alert("Некорректные данные");
                return;
            }

            let data = this.dataManager.getData();
            $.ajax({
                url: this.config.get("path") + $.param(data),
                type: "POST",
                dataType: "json",
                success: (response): void => {
                    if (response.error != null) {
                        alert("Ответ не получен")
                        console.log(response)
                        return;
                    }
                    const rowData: object = {...data, hit: response.result, now: response.now, time: response.time};
                    this.tableManager.addData(rowData);
                },
            });
        });
    }
}