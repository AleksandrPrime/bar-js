# bar-js
Ligthweight, configurable and simple barchart library on JavaScript

![Packagist License](https://img.shields.io/packagist/l/doctrine/orm)
![Codacy grade](https://img.shields.io/codacy/grade/e27821fb6289410b8f58338c7e0bc686)
![Chrome Web Store](https://img.shields.io/chrome-web-store/stars/ogffaloegjglncjfehdfplabnoondfjo)

## Description
bar.js is a Canvas based simple JavaScript Bar Chart Library to provide a configurable, lightweght and dependency-free
experience.
[Link to example page](https://aleksandrprime.github.io/bar-js/example/)

![](https://github.com/AleksandrPrime/bar-js/raw/main/bar.png)


## Installation
Download the 'bar.min.js' and include it in your project

```html
<script src="bar.min.js"></script>
```

## Usage
To create the bar chart, you need a block level container like a div or p.
```html
<div id="chart">This will be bar chart!</div>
```
Then you can create the BarChart object in your JavaScript file

```js
let barChart = new BarChart(chartId, chartWidth, chartHeight, data);
```

### Parameters
- `chartId - container Id (String)`
Define the id of container like "chart"
- `chartWidth (Integer)`
Define the width of the chart like 500
- `chartHeight (Integer)`
Define the height of the chart like 400
- `data (Objects Array)`
Define the data objects. The objects should have 2 key-value pairs: label and value. Example data:

```js
const data = [
        {label: 'Jan', value: 123},
        {label: 'Feb', value: 33},
        {label: 'March', value: 44},
        {label: 'April', value: 344},
        {label: 'May', value: 134}
    ]
```

## Licence
[MIT](LICENCE.md) © [AlexPrime](https://github.com/AleksandrPrime)





