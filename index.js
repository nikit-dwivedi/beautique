import { createServer as createHttpServer } from 'http';
import app from './app.js';
import {config} from "dotenv";
import { readFileSync } from 'fs';
import { createServer as createHttpsServer } from 'https';
config()
const port = process.env.PORT||9000;
const sPort = process.env.SPORT||7889;

var privateKey  = readFileSync('sslcert/server.key', 'utf8');
var certificate = readFileSync('sslcert/server.crt', 'utf8');

let credentials = {key: privateKey, cert: certificate};

const server = createHttpServer(app)
const secureServer = createHttpsServer(credentials,app);

server.listen(port, () => {
    console.log(`server running on ${port}`);
})

secureServer.listen(sPort, () => {
    console.log(`Secure server listening at ${sPort}`);
})