import bodyParser from 'body-parser';
import compression from 'compression';
import dotnet from 'dotenv';
import express from 'express';
import helmet from 'helmet';
import xml from 'xml';

_subscribeToNodeProcess();

dotnet.config();

const port = process.env?.PORT || 80;

const units = process.env?.UNIT || 'F';

const app = express();

app.use(helmet());

app.use(compression());

app.use(bodyParser.urlencoded({ extended: false, limit: '50mb' }));

app.get('/state.xml', (req, res) => {
  res.setHeader('content-type', 'text/xml');

  res.send(xml({
    datavalues: [ {
      units,
    } ],
  }));
});

app.listen(port, () => console.log(`Listening to http://localhost:${port}`));

function _onEndProcess() {
  app?.close?.();

  process.exit();
}

function _subscribeToNodeProcess() {
  process.stdin.resume();

  process.on('SIGINT', _onEndProcess);
  process.on('SIGUSR1', _onEndProcess);
  process.on('uncaughtException', _onEndProcess);
}
