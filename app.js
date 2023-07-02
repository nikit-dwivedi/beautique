import express, {  urlencoded, json } from 'express';
import cors from 'cors';
const app = express();
import morgan from 'morgan';
import "./src/api/v1/config/mongodb.js";
import version1Index from './src/api/v1/index.js';
import { badRequest } from './src/api/v1/helpers/response.helper.js';

//----------use dependencies----------------------------------
//use morgan
app.use(morgan('dev'));
// use cors
app.use(cors());
//image path
app.use('/static', express.static('static'))
//body parsing
app.use(urlencoded({ extended: false }));
app.use(json());
//compression

//----------redirect routes-----------------------------------
app.use('/v1', version1Index);


//----------for invalid requests start -----------------------


app.all('*', async (req, res) => {
    await badRequest(res, 'Invalid URI');
});

export default app;