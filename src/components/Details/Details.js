import React from "react";
import DetailsListItem from "./DetailsListItem";
import "./Details.css";


/*
 * Component that presents data about a single drop
 */
const Details = (props) => {
    if (!props.data) {
        return <p>No data yet</p>;
    }
    const { humidity, temp, location, light, time, device } = props.data;

    // Format data to avoid doing it in JSX
    const locationString = `${location.lat}, ${location.lon}`;
    const lightString = light ? "on" : "off";
    const timeString = time.toUTCString();

    return (
        <ul className="details-list">
            <DetailsListItem name="Device" value={device} />
            <DetailsListItem name="Location" value={locationString} />
            <DetailsListItem name="Temp" value={temp} />
            <DetailsListItem name="Humidity" value={humidity} />
            <DetailsListItem name="Light" value={lightString} />
            <DetailsListItem name="Time" value={timeString} />
        </ul>
    );
};
export default Details;