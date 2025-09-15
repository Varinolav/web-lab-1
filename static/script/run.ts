import App from "./app";
import Config from "./config";
import DataManager from "./dataManager";
import ResultTableManager from "./ResultTableManager";
import SvgManager from "./svgManager";


let config: Config = new Config();
config.set("path", "/calculate?");
// config.set("path", "/fcgi-bin/app.jar?"); // helios
let dataManager: DataManager = new DataManager();
const table: HTMLTableElement = document.getElementById("result-table") as HTMLTableElement;

let tableManager: ResultTableManager = new ResultTableManager(table);
let svgManager: SvgManager = new SvgManager(dataManager);

new App(config, tableManager, dataManager, svgManager).initializeListeners();