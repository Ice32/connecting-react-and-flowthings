import React from "react";
import { Line as LineChart } from "react-chartjs";
import "./LineGraph.css";

const getFormattedFullDate = (drop) => {
    const time = drop.time;

    const hours = time.getHours();
    const minutes = time.getMinutes();
    const seconds = time.getSeconds();
    
    return (`${hours}:${minutes}:${seconds}`)
};
const sortDescending = (first, second) => {
    return first.time < second.time ? 1 : -1;
};
const sortAscending = (first, second) => {
    return first.time > second.time ? 1 : -1;
};

/*
 * Component that presents a line graph of temperatures for all drops
 */
const LineGraph = (props) => {
    const { data } = props;
    const sortedData = data.sort(sortDescending).slice(0, 20).sort(sortAscending)
    const chartData = {
        labels: sortedData.map(getFormattedFullDate),
        datasets: [
            {
                fillColor: "rgba(220,220,220,0.2)",
                strokeColor: "rgb(27, 93, 198)",
                pointColor: "rgb(77, 138, 234)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(220,220,220,1)",
                label: "Temperature diagram",
                data: sortedData.map(contact => parseInt(contact.temp, 10)),
                spanGaps: true
            }
        ]
    };

    return (
        <div className="line-graph-container">
            <p>Temperature over time</p>
            <LineChart data={chartData} width="300px" height="250px" options={{responsive: false}} />
        </div>
    );
};
export default LineGraph;