/*
    * bar.js
    * simple, elegant bar chart library
    * {date} - version 1.0
    * {url}
    *
    * Copyright 2021 AlexPrime
    *
    *
    *
*/

'use strict'

function BarChart(targetId, width, height, data) {
    //base
    const chart = this

    // Specify Configurations
    chart.configureChart(targetId, width, height, data)

    //Pre Operations
    chart.performPreOperations()

    console.log(chart)
}

BarChart.prototype.configureChart = function (targetId, width, height, data) {
    //base
    const chart = this

    //global Canvas Specifications
    chart.setCanvasParameters(targetId, width, height, data)

    //Global chart specifications
    chart.setChartParameters()


}

BarChart.prototype.setCanvasParameters = function (targetId, width, height, data) {
    //base
    const chart = this

    //Canvas specifications come from outside

    chart.id = targetId
    chart.width = width
    chart.height = height
    chart.data = data
}

BarChart.prototype.setChartParameters = function () {
    //base
    const chart = this

    //Axis Configurations
    chart.axisRatio = 10 //in terms of percentage
    chart.verticalMargin = (chart.height * chart.axisRatio) / 100
    chart.horizontalMargin = (chart.width * chart.axisRatio) / 100
    chart.axisColor = "#b1b1b1"
    chart.axisWidth = 0.75

    //label configurations
    chart.fontRatio = 3 //in terms of percentage
    chart.fontFamily = "times"
    chart.fontStyle = "normal"
    chart.fontWeight = "300"
    chart.fontColor = "#666"
    chart.verticalFontSize = (chart.height * chart.fontRatio) / 100
    chart.horizontalFontSize = (chart.width * chart.fontRatio) / 100

    //guideline configurations
    chart.guidelineColor = "#e5e5e5"
    chart.guidelineWidth = 0.5
}

BarChart.prototype.performPreOperations = function () {
    //base
    const chart = this

    //Create Canvas
    chart.createCanvas()

    //get data
    chart.handleData()

    //prepare data
    chart.prepareData()

    //Draw Chart
    chart.drawChart()


}

BarChart.prototype.createCanvas = function () {
    //base
    const chart = this

    //Create Canvas

    let canvas = document.createElement('canvas')
    canvas.id = chart.id + '-' + Math.random()
    canvas.width = chart.width
    canvas.height = chart.height

    //Append canvas to target container
    document.getElementById(chart.id).innerHTML = '' // clean container
    document.getElementById(chart.id).appendChild(canvas) //add canvas to clean container

    //Add canvas to chart object
    chart.canvas = canvas
    chart.context = canvas.getContext('2d')

}

BarChart.prototype.handleData = function () {
    //base
    const chart = this

    //data sets
    chart.labels = []
    chart.values = []

    //handle Data
    chart.data.forEach((item)=>{
        chart.labels.push(item.label)
        chart.values.push(item.value)
    })
}

BarChart.prototype.prepareData = function () {
    //base
    const chart = this

    //Global Variable
    chart.itemsNum = chart.data.length
    chart.maxValue = Math.max.apply(null, chart.values)
    chart.minValue = Math.min.apply(null, chart.values)

    //axis specification
    chart.verticalAxisWidth = chart.height - 2 * chart.verticalMargin
    chart.horizontalAxisWidth = chart.width - 2 * chart.horizontalMargin

    //Label Specifications
    chart.verticalUpperBound = Math.ceil(chart.maxValue / 10) * 10
    chart.verticalLabelFreq = chart.verticalUpperBound / chart.itemsNum
    chart.horizontalLabelFreq = chart.horizontalAxisWidth / chart.itemsNum

}

BarChart.prototype.drawChart = function () {
    //base
    const chart = this

    //Vertical Axis
    chart.drawVerticalAxis()

    //Vertical Labels
    chart.drawVerticalLabels()

    //Horizontal Axis
    chart.drawHorizontalAxis()

    //Horizontal Labels
    chart.drawHorizontalLabels()

    //Horizontal guidelines
    chart.drawHorizontalGuidelines()

    //Vertical guidelines
    chart.drawVerticalGuidelines()

    //Draw bars
    chart.drawBars()


}

BarChart.prototype.drawVerticalAxis = function () {
    //base
    const chart = this

    //Vertical Axis
    chart.context.beginPath();
    chart.context.strokeStyle = chart.axisColor
    chart.context.lineWidth = chart.axisWidth
    chart.context.moveTo(chart.horizontalMargin, chart.verticalMargin)
    chart.context.lineTo(chart.horizontalMargin, chart.height - chart.verticalMargin)
    chart.context.stroke()

}

BarChart.prototype.drawVerticalLabels = function () {
    //base
    const chart = this

    //Text specifications
    chart.context.font = chart.fontStyle + ' ' + chart.fontWeight + ' ' + chart.verticalFontSize + 'px ' + chart.fontFamily
    chart.context.textAlign = "right"
    chart.context.fillStyle = chart.fontColor

    //scale values
    let scaledVerticalLabelFreq = (chart.verticalAxisWidth / chart.verticalUpperBound) * chart.verticalLabelFreq



    //Draw labels
    for (let i = 0; i <= chart.itemsNum; i++) {
        let labelText = chart.verticalUpperBound - i * chart.verticalLabelFreq
        let verticalLabelX = chart.horizontalMargin - chart.horizontalMargin / chart.axisRatio
        let verticalLabelY = chart.verticalMargin + i * scaledVerticalLabelFreq

        chart.context.fillText(labelText.toString(), verticalLabelX, verticalLabelY)
    }





}

BarChart.prototype.drawHorizontalAxis = function () {
    //base
    const chart = this

    //Horizontal Axis
    chart.context.beginPath();
    chart.context.strokeStyle = chart.axisColor
    chart.context.lineWidth = chart.axisWidth
    chart.context.moveTo(chart.horizontalMargin, chart.height - chart.verticalMargin)
    chart.context.lineTo(chart.width - chart.horizontalMargin, chart.height - chart.verticalMargin)
    chart.context.stroke()
}

BarChart.prototype.drawHorizontalLabels = function () {
    //base
    const chart = this

    //Text specifications
    chart.context.font = chart.fontStyle + ' ' + chart.fontWeight + ' ' + chart.verticalFontSize + 'px ' + chart.fontFamily
    chart.context.textAlign = "center"
    chart.context.textBaseline = "top"
    chart.context.fillStyle = chart.fontColor

    //Draw Labels
    for (let i = 0; i < chart.itemsNum; i++) {
        let horizontalLabelX = chart.horizontalMargin + i * chart.horizontalLabelFreq + chart.horizontalLabelFreq / 2
        let horizontalLabelY = chart.height - chart.verticalMargin + chart.verticalMargin / chart.axisRatio

        chart.context.fillText(chart.labels[i], horizontalLabelX, horizontalLabelY)
    }
}

BarChart.prototype.drawHorizontalGuidelines = function () {
    //base
    const chart = this

    //Specification
    chart.context.strokeStyle = chart.guidelineColor
    chart.context.lineWidth = chart.guidelineWidth

    //scale values
    let scaledVerticalLabelFreq = (chart.verticalAxisWidth / chart.verticalUpperBound) * chart.verticalLabelFreq

    //Draw labels
    for (let i = 0; i <= chart.itemsNum; i++) {
        //Starting point coordinate
        let horizontalGuidelineStartX = chart.horizontalMargin
        let horizontalGuidelineStartY = chart.verticalMargin + i * scaledVerticalLabelFreq
        //End point coordinate
        let horizontalGuidelineEndX = chart.horizontalMargin + chart.horizontalAxisWidth
        let horizontalGuidelineEndY = chart.verticalMargin + i * scaledVerticalLabelFreq

        chart.context.beginPath()
        chart.context.moveTo(horizontalGuidelineStartX, horizontalGuidelineStartY)
        chart.context.lineTo(horizontalGuidelineEndX, horizontalGuidelineEndY)
        chart.context.stroke()


    }
}

BarChart.prototype.drawVerticalGuidelines = function () {
    //base
    const chart = this

    //Specification
    chart.context.strokeStyle = chart.guidelineColor
    chart.context.lineWidth = chart.guidelineWidth

    //Draw Labels
    for (let i = 0; i <= chart.itemsNum; i++) {

        //Starting point coordinate
        let verticalGuidelineStartX = chart.horizontalMargin + i * chart.horizontalLabelFreq
        let verticalGuidelineStartY = chart.height - chart.verticalMargin
        //End point coordinate
        let verticalGuidelineEndX = chart.horizontalMargin + i * chart.horizontalLabelFreq
        let verticalGuidelineEndY = chart.verticalMargin

        chart.context.beginPath()
        chart.context.moveTo(verticalGuidelineStartX, verticalGuidelineStartY)
        chart.context.lineTo(verticalGuidelineEndX, verticalGuidelineEndY)
        chart.context.stroke()


    }

}

BarChart.prototype.drawBars = function () {
    //base
    const chart = this


    for (let i = 0; i < chart.itemsNum; i++) {

        let color = chart.createRandomRGBColor()
        let fillOpacity = '0.3'
        let fillColor = 'rgba(' + color.r + ', ' + color.g + ', ' + color.b + ', ' + fillOpacity + ')'
        let borderColor = 'rgba(' + color.r + ', ' + color.g + ', ' + color.b + ')'

        let barX = chart.horizontalMargin + i * chart.horizontalLabelFreq + chart.horizontalLabelFreq / chart.axisRatio
        let barY = chart.height - chart.verticalMargin
        let barWidth = chart.horizontalLabelFreq - 2 * chart.horizontalLabelFreq / chart.axisRatio
        let barHeight = -1 * chart.verticalAxisWidth * chart.values[i] / chart.maxValue

        chart.context.beginPath()
        chart.context.fillStyle = fillColor
        chart.context.strokeStyle = borderColor
        chart.context.rect(barX, barY, barWidth, barHeight)
        chart.context.stroke()
        chart.context.fill()


    }
}

BarChart.prototype.createRandomRGBColor = function () {

    let red = getRandomInt(0,257)
    let green = getRandomInt(0,257)
    let blue = getRandomInt(0,257)

    return {r: red, g: green, b:  blue}

}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //Максимум не включается, минимум включается
}





























