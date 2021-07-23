# X-300 Relay Simulator

## System Requirements

* [NodeJS](https://nodejs.org/en/download/current/)

## Usage

1. Download the latest [package](https://github.com/phimimms/x300-sim/packages/904085)
2. Extract the compressed download
3. Open a terminal to the extracted package directory
4. Run the web server via `node index.js`

## API

Prior to running the web server, the `.env` file can be edited to configure the behavior of the X-300 Relay simulator.

* `PORT` - The HTTP port number of the web server
* `UNIT` - The unit of measurement for the temperature readings
  * `C` - Celsius
  * `F` - Fahrenheit
* `RELAY_X` - The initial state of the relay where `X` is the relay number (`1 - 3`)
  * `0` - The relay is off
  * `1` - The relay is on
* `TEMP_X` - Indicates whether the thermometer will be simulated where `X` is the thermometer channel (`1 - 8`)
  * `0` - The thermometer will not be simulated
  * `1` - The thermometer will be simulated
* `TEMP_BASE` - The base value of the simulated temperature readings
* `TEMP_VARIANCE` - The absolute variance of the simulated temperature readings
