import React, { Component } from 'react';
import DeviceController from "./DeviceController/DeviceController.js";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'


class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <DeviceController />
      </MuiThemeProvider>
    );
  }
}

export default App;
