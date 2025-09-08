"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SvgManager = /** @class */ (function () {
    function SvgManager(dataManager) {
        this.dataManager = dataManager;
    }
    SvgManager.prototype.drawPoint = function () {
        if (!this.dataManager.isValid()) {
            return;
        }
        var svgCenterX = 250;
        var svgCenterY = 250;
        var coordinateX = svgCenterX + parseFloat(this.dataManager.x) / parseFloat(this.dataManager.r) * 100;
        var coordinateY = svgCenterY - parseFloat(this.dataManager.y) / parseFloat(this.dataManager.r) * 100;
        console.log(coordinateY, coordinateY);
        var point = $("#pointer");
        point.attr('cx', "" + coordinateX);
        point.attr('cy', "" + coordinateY);
        point.attr('visibility', 'visible');
    };
    SvgManager.prototype.intializeSvgClick = function () {
        var _this = this;
        $("svg").on("click", function (event) {
            if (!_this.dataManager.r) {
                alert("Сначала выберите значение R");
                return;
            }
            var svg = event.currentTarget;
            var rect = svg.getBoundingClientRect();
            var svgX = event.clientX - rect.left;
            var svgY = event.clientY - rect.top;
            var svgCenterX = 250;
            var svgCenterY = 250;
            var scale = 100;
            var mathX = (svgX - svgCenterX) / scale * parseFloat(_this.dataManager.r);
            var mathY = (svgCenterY - svgY) / scale * parseFloat(_this.dataManager.r);
            var roundedX = Math.round(mathX * 10) / 10;
            var roundedY = Math.round(mathY * 10) / 10;
            _this.dataManager.x = roundedX.toString();
            _this.dataManager.y = roundedY.toString();
            _this.drawPoint();
        });
    };
    return SvgManager;
}());
exports.default = SvgManager;
