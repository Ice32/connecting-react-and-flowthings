import React from "react";
import { Chart as GoogleChart } from 'react-google-charts';
import "./GaugeChart.css";

const GaugeChart = (props) => {
    return (
        <div className="gauge-chart-container">
            <GoogleChart
                    chartType="Gauge"
                    data={[['Temperature'], [props.temp]]}
                    options={{
                        redFrom: 70, redTo: 100,
                        yellowFrom: 40, yellowTo: 70,
                    }}
                    graph_id="ScatterChart"
                    width="300px"
                    height="300px"
                    legend_toggle
                />
        </div>
    );
}
export default GaugeChart;