window.onload = function () {

    let min = 1
    let max = 100

    const data = [
        {label: 'Jan', value: getRandomInt(min, max)},
        {label: 'Feb', value: getRandomInt(min, max)},
        {label: 'March', value: getRandomInt(min, max)},
        {label: 'April', value: getRandomInt(min, max)},
        {label: 'May', value: getRandomInt(min, max)}
    ]

    //Chart Specification
    let targetId = "canvas-root"
    let canvasWidth = 600
    let canvasHeight = 450

    const chart = new BarChart(targetId, canvasWidth, canvasHeight, data)







    /*const cvs = document.getElementById("canvas-root")
    cvs.width = 900
    cvs.height = 600
    const ctx = cvs.getContext("2d")*/


}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //Максимум не включается, минимум включается
}