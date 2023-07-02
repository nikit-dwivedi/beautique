import { createServer } from 'http';
import app from './app.js';
import {config} from "dotenv";
import { randomBytes } from 'crypto';
config()
const port = process.env.PORT||9000;
const server = createServer(app)
server.listen(port, () => {
    console.log(`server running on ${port}`);
})