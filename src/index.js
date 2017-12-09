import http from 'http';
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import config from './config';
import routes from './routes';

let app = express();
app.server = http.createServer(app);

// middleware to parse application/json
app.use(bodyParser.json({
    limit : config.bodyLimit
  }));
  

// api routes
app.use('/api', routes);

app.server.listen(config.port);

console.log(`Starting on port ${app.server.address().port}`);

export default app;