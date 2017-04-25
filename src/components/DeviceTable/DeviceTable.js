import React from "react";
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import "./DeviceTable.css";

/*
 * A table that lists history of all drops
 */
class DeviceTable extends React.Component {
    getRows = () => {
        return this.props.data.map((deviceContact, index) => (
            <TableRow key={index}>
                <TableRowColumn>{index}</TableRowColumn>
                <TableRowColumn>{`${deviceContact.location.lat}, ${deviceContact.location.lon}`}</TableRowColumn>
                <TableRowColumn>{deviceContact.temp}</TableRowColumn>
                <TableRowColumn>{deviceContact.humidity}</TableRowColumn>
                <TableRowColumn>{deviceContact.light ? "on" : "off"}</TableRowColumn>
                <TableRowColumn>{deviceContact.time.toString()}</TableRowColumn>
            </TableRow>
        ))
    };
    render() {
        if (this.props.loading) {
            return <h5>Loading...</h5>;
        }
        const tableRowsData = this.getRows();
        return (
            <div className="table-container">
                <Table onCellClick={this.props.onSelect}>
                    <TableHeader>
                        <TableRow>
                            <TableHeaderColumn>ID</TableHeaderColumn>
                            <TableHeaderColumn>Location</TableHeaderColumn>
                            <TableHeaderColumn>Temperature</TableHeaderColumn>
                            <TableHeaderColumn>Humidity</TableHeaderColumn>
                            <TableHeaderColumn>Light</TableHeaderColumn>
                            <TableHeaderColumn>Time</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody deselectOnClickaway={false}>
                        {tableRowsData}
                    </TableBody>
                </Table>
            </div>
        )
    }
}
export default DeviceTable;