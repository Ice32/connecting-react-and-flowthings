//      
import React from "react";
import DeviceTable from "../DeviceTable/DeviceTable.js";
import Details from "../Details/Details.js";
import flowthings from "flowthings-browser";
import LineGraph from "../LineGraph/LineGraph.js";
import GaugeChart from "../GaugeChart/GaugeChart.js";
import "./DeviceController.css";

const path = "/ice32/first_flow";
const flowthingsCredentials = {
    account: "",
    token: ""
};
const api = flowthings.API(flowthingsCredentials);
                           
  

/*
 * Component that handles most of the app's logic. 
 * It retrieves needed data in componentDidMount and it
 * starts listening through websockets
 */
class DeviceController extends React.Component {
    state = {
        deviceContactsList: [],
        loading: true,
        selectedDropIndex: 0
    }
    extractDropData = (received) => {
        return ({
                    location: received.location,
                    temp: received.elems.temp.value,
                    humidity: received.elems.humidity.value,
                    light: received.elems.light.value,
                    time: new Date(received.creationDate),
                    device: received.elems.device ? received.elems.device.value : "Unknown device"
                });
    };
    componentDidMount() {
        api.drop("f58ffadc55caf784b9e24ed0a").find({limit: 30}, (err, res) => {
            if (err !== null) {
                console.log(err);
                return;
            }

            const extractedData = res.body.map(this.extractDropData);
            this.setState({
                deviceContactsList: [...this.state.deviceContactsList, ...extractedData],
                loading: false
            })
        });
        api.ws.connect(function () {
            console.log('Connected');
        });

        // Subsribe to Drops 
        api.ws.subscribe(path, this.dropArrived, function (err, res) {
            if (res) {
                console.log('Subscribed');
            }
        });
    }
    dropArrived = (drop) => {
        const extracted = this.extractDropData(drop);
        const selectedDropIndex = this.state.selectedDropIndex;
        this.setState({
            deviceContactsList: [...this.state.deviceContactsList, extracted],
            selectedDropIndex: selectedDropIndex === 0 ? 0 : selectedDropIndex + 1
        });
    }
    dropSelected = (clickedCell) => {
        this.setState({
            selectedDropIndex: clickedCell
        })
    }
    render() {
        if (this.state.loading) {
            return (
                <div className="loader">
                    <h4>Loading...</h4>
                </div>
            );
        }
        const { deviceContactsList, selectedDropIndex } = this.state;
        const selected = deviceContactsList.length > 0 ? deviceContactsList[selectedDropIndex] : { temp: 0 };
        return (
            <div>
                <div className="main-details-container">
                    <Details
                        data={deviceContactsList[selectedDropIndex]} />
                    <LineGraph
                        data={deviceContactsList} />
                    <GaugeChart temp={parseInt(selected.temp, 10)} />
                </div>
                <DeviceTable
                    loading={this.state.loading}
                    data={this.state.deviceContactsList}
                    onSelect={this.dropSelected} />
            </div>
        )
    }
}
export default DeviceController;