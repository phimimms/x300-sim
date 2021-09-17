import bodyParser from 'body-parser';
import compression from 'compression';
import dotenv from 'dotenv';
import express from 'express';
import helmet from 'helmet';
import xml from 'xml';

_subscribeToNodeProcess();

dotenv.config();

const app = express();

app.use(helmet());

app.use(compression());

app.use(bodyParser.urlencoded({ extended: false, limit: '50mb' }));

const port = Number.isInteger(+process.env.PORT) ? process.env.PORT : 2020;

const state = {
  relay1: Number.isInteger(+process.env.RELAY_1) ? process.env.RELAY_1 : '0',
  relay2: Number.isInteger(+process.env.RELAY_2) ? process.env.RELAY_2 : '0',
  relay3: Number.isInteger(+process.env.RELAY_3) ? process.env.RELAY_3 : '0',
  temp1: Number.isInteger(+process.env.TEMP_1) && !!+process.env.TEMP_1,
  temp2: Number.isInteger(+process.env.TEMP_2) && !!+process.env.TEMP_2,
  temp3: Number.isInteger(+process.env.TEMP_3) && !!+process.env.TEMP_3,
  temp4: Number.isInteger(+process.env.TEMP_4) && !!+process.env.TEMP_4,
  temp5: Number.isInteger(+process.env.TEMP_5) && !!+process.env.TEMP_5,
  temp6: Number.isInteger(+process.env.TEMP_6) && !!+process.env.TEMP_6,
  temp7: Number.isInteger(+process.env.TEMP_7) && !!+process.env.TEMP_7,
  temp8: Number.isInteger(+process.env.TEMP_8) && !!+process.env.TEMP_8,
  unit: process.env.UNIT === 'C' || process.env.UNIT === 'F' ? process.env.UNIT : 'F',
};

const baseTemp = Number.isInteger(+process.env.TEMP_BASE) ? +process.env.TEMP_BASE : 60;
const tempVariance = Number.isInteger(+process.env.TEMP_VARIANCE) ? +process.env.TEMP_VARIANCE : 30;

app.get('/state.xml', (req, res) => {
  res.setHeader('content-type', 'text/xml');

  _processQueryParameters(req.query);

  res.send(xml({
    datavalues: [
      { units: state.unit },
      { sensor1temp: state.temp1 ? _getRandomTemperature() : 'x.x' },
      { sensor2temp: state.temp2 ? _getRandomTemperature() : 'x.x' },
      { sensor3temp: state.temp3 ? _getRandomTemperature() : 'x.x' },
      { sensor4temp: state.temp4 ? _getRandomTemperature() : 'x.x' },
      { sensor5temp: state.temp5 ? _getRandomTemperature() : 'x.x' },
      { sensor6temp: state.temp6 ? _getRandomTemperature() : 'x.x' },
      { sensor7temp: state.temp7 ? _getRandomTemperature() : 'x.x' },
      { sensor8temp: state.temp8 ? _getRandomTemperature() : 'x.x' },
      { relay1state: state.relay1 },
      { relay2state: state.relay2 },
      { relay3state: state.relay3 },
      { extvar0: 0.00 },
      { extvar1: 0.00 },
      { extvar2: 0.00 },
      { extvar3: 0.00 },
      { extvar4: 0.00 },
      { time: Date.now() },
      { serialNumber: '00:0C:C8:00:00:00' },
    ],
  }));
});

app.listen(port, () => console.log(`Listening to http://localhost:${port}`));

function _getRandomTemperature() {
  return (baseTemp + (Math.random() < 0.5 ? 1 : -1) * tempVariance * Math.random()).toFixed(2);
}

function _onEndProcess() {
  app?.close?.();

  process.exit();
}

function _processQueryParameters(params) {
  for (let i = 1; i <= 3; i++) {
    if (!Object.prototype.hasOwnProperty.call(params, `relay${i}State`)) {
      continue;
    }

    const relayState = params[`relay${i}State`];

    if (!Number.isInteger(+relayState)) {
      break;
    }

    state[`relay${i}`] = relayState;

    break;
  }
}

function _subscribeToNodeProcess() {
  process.stdin.resume();

  process.on('SIGINT', _onEndProcess);
  process.on('SIGUSR1', _onEndProcess);
  process.on('uncaughtException', _onEndProcess);
}
