import DataManager from "./dataManager";

export default class SvgManager {
    private dataManager: DataManager;


    constructor(dataManager: DataManager) {
        this.dataManager = dataManager;
    }

    public drawPoint(): void {
        if (!this.dataManager.isValid()) {
            return;
        }

        const svgCenterX: number = 250;
        const svgCenterY: number = 250;

        const coordinateX = svgCenterX + parseFloat(this.dataManager.x) / parseFloat(this.dataManager.r) * 100;
        const coordinateY = svgCenterY - parseFloat(this.dataManager.y) / parseFloat(this.dataManager.r) * 100;
        console.log(coordinateY, coordinateY);
        let point = $("#pointer");
        point.attr('cx', "" + coordinateX);
        point.attr('cy', "" + coordinateY);
        point.attr('visibility', 'visible');
    }
}