import { Chart } from "@ag-enterprise/grid-charts/src/charts/chart/chart";
import { CartesianChart } from "@ag-enterprise/grid-charts/src/charts/chart/cartesianChart";
import { CategoryAxis } from "@ag-enterprise/grid-charts/src/charts/chart/axis/categoryAxis";
import { NumberAxis } from "@ag-enterprise/grid-charts/src/charts/chart/axis/numberAxis";
import { AreaSeries } from "@ag-enterprise/grid-charts/src/charts/chart/series/areaSeries";
import { createButton } from "../../lib/ui";

const data = [
    { label: 'L1', v1: 1, v2: 2, v3: 5, v4: 4, v5: 5 },
    { label: 'L2', v1: 1, v2: 2, v3: 5, v4: 4, v5: 5 },
    { label: 'L3', v1: 1, v2: 2, v3: 5, v4: 4, v5: 5 }
];

document.addEventListener('DOMContentLoaded', () => {
    const xAxis = new CategoryAxis();
    const yAxis = new NumberAxis();
    const chart = new CartesianChart({
        xAxis,
        yAxis
    });
    chart.width = 800;
    chart.height = 600;
    chart.parent = document.body;

    const series1 = new AreaSeries();
    series1.xKey = 'label';
    series1.yKeys = ['v1', 'v2'];
    series1.data = data;
    series1.fills = ['red', 'green'];
    series1.fillOpacity = 0.3;
    series1.strokes = ['black'];

    const series2 = new AreaSeries();
    series2.xKey = 'label';
    series2.yKeys = ['v3'];
    series2.data = data;
    series2.fills = ['blue'];
    series2.fillOpacity = 0.3;
    series2.strokes = ['black'];

    const series3 = new AreaSeries();
    series3.xKey = 'label';
    series3.yKeys = ['v4', 'v5'];
    series3.data = data;
    series3.fills = ['yellow', 'magenta'];
    series3.fillOpacity = 0.3;
    series3.strokes = ['black'];

    chart.series = [series1, series2] as any[];

    document.body.appendChild(document.createElement('br'));

    createButton('add 3 after 1', () => {
        chart.addSeriesAfter(series3, series1);
    });

    createButton('add 3 after 2', () => {
        chart.addSeriesAfter(series3, series2);
    });

    makeChartResizeable(chart);
});

function makeChartResizeable(chart: Chart) {
    let startX = 0;
    let startY = 0;
    let isDragging = false;
    let chartSize: [number, number];
    const scene = chart.scene;

    scene.canvas.element.addEventListener('mousedown', (e: MouseEvent) => {
        startX = e.offsetX;
        startY = e.offsetY;
        chartSize = chart.size;
        isDragging = true;
    });
    scene.canvas.element.addEventListener('mousemove', (e: MouseEvent) => {
        if (isDragging) {
            const dx = e.offsetX - startX;
            const dy = e.offsetY - startY;
            chart.size = [chartSize[0] + dx, chartSize[1] + dy];
        }
    });
    scene.canvas.element.addEventListener('mouseup', () => {
        isDragging = false;
    });
}