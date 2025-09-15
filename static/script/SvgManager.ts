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
        let point = $("#pointer");
        point.attr('cx', "" + coordinateX);
        point.attr('cy', "" + coordinateY);
        point.attr('visibility', 'visible');
    }

    public initializeSvgClick(): void {
        $("svg").on("click", (event): void => {
            if (!this.dataManager.r) {
                alert("Сначала выберите значение R");
                return;
            }

            const svg = event.currentTarget;
            const rect = svg.getBoundingClientRect();
            const svgX = event.clientX - rect.left;
            const svgY = event.clientY - rect.top;

            const svgCenterX = 250;
            const svgCenterY = 250;
            const scale = 100;

            const mathX: number = (svgX - svgCenterX) / scale * parseFloat(this.dataManager.r);
            const mathY: number = (svgCenterY - svgY) / scale * parseFloat(this.dataManager.r);



            this.dataManager.x = mathX.toString();
            this.dataManager.y = mathY.toString();

            this.drawPoint();
        });
    }
}