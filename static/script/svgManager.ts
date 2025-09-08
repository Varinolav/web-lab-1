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

    public intializeSvgClick(): void {
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

            const roundedX: number = Math.round(mathX * 10) / 10;
            const roundedY: number = Math.round(mathY * 10) / 10;

            this.dataManager.x = roundedX.toString();
            this.dataManager.y = roundedY.toString();

            this.drawPoint();
        });
    }
}