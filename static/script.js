// "use strict"
//
// import ClickEvent = JQuery.ClickEvent;
// import ResultTableManager from "./ResultTableManager";
//
// let x: string, y: string, r: string;
// const table: HTMLTableElement = document.getElementById("result-table") as HTMLTableElement;
//
//
// //
// // function isValid(x: string, y: string, r: string): boolean {
// //     return x !== null && r !== null && y != null && y != "";
// // }
//
//
// // $("input[name=X-button]").on("click", drawPoint)
// // $("input[name=R-button]").on("click", drawPoint)
// // $("input[name=Y-input]").on("input", drawPoint)
// //
// // function drawPoint(): void {
// //     if (!isValid(x, y, r)) {
// //         return;
// //     }
// //
// //     const svgCenterX: number = 250;
// //     const svgCenterY: number = 250;
// //
// //     const coordinateX = svgCenterX + parseFloat(x) / parseFloat(r) * 100;
// //     const coordinateY = svgCenterY - parseFloat(y) / parseFloat(r) * 100;
// //     console.log(coordinateY, coordinateY);
// //     let point = $("#pointer");
// //     point.attr('cx', "" + coordinateX);
// //     point.attr('cy', "" + coordinateY);
// //     point.attr('visibility', 'visible');
// // }
//
// // jQuery(function (): void {
//
//     // $(".input-btn").on("click", function (): void {
//     //     if ($(this).hasClass("selected")) {
//     //         $(this).removeClass("selected");
//     //         if ($(this).attr("name") === "X-button") {
//     //             x = null;
//     //         }
//     //         if ($(this).attr("name") === "R-button") {
//     //             r = null;
//     //         }
//     //     } else {
//     //         $(".input-btn").removeClass("selected");
//     //         $(this).addClass("selected");
//     //     }
//     // });
// // });
//
//
// // const tableManager: ResultTableManager = new ResultTableManager(table);
// // $("#prev-btn").on("click", () => tableManager.previousPage());
// // $("#next-btn").on("click", () => tableManager.nextPage());
// $("input[name=check-button]").on("click", function (e: ClickEvent<HTMLElement>): void {
//     if (!isValid(x, y, r)) {
//         alert("Некорректные данные");
//         return;
//     }
//
//     let data = {
//         "x": x,
//         "y": y,
//         "r": r
//     }
//     $.ajax({
//         url: "/calculate?" + $.param(data),
//         type: "POST",
//         dataType: "json",
//         success: function (response): void {
//             if (response.error != null) {
//                 alert("Ответ не получен")
//                 console.log(response)
//             }
//
//             const rowData: object = {...data, hit: response.result, now: response.now, time: response.time};
//             tableManager.addData(rowData);
//         },
//     });
// });
//
//
// // function get() {
// //     console.log(x);
// //     console.log(y);
// //     console.log(r);
// // }
//
// // $("#clear-btn").on("click", () => tableManager.clearTable());
