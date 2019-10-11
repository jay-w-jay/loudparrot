import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

const app = express();
const router = express.Router();

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost/loudparrot');

const connection = mongoose.connection;

connection.once('open', () => {
    console.log("Database connection successfully open");
});

require('./endpoints/authenticationEndpoint')(router);
require('./endpoints/employeeEndpoint')(router);
require('./endpoints/departmentEndpoint')(router);

app.use('/', router);
app.listen(4371, () => console.log('ExpressJS Server for loudparrot running on port 4371'));