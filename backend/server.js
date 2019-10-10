import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

import Department from './models/department';
import Empployee from './models/employee';

const app = express();
const router = express.Router();

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost/loudparrot');

const connection = mongoose.connection;

connection.once('open', () => {
    console.log("Database connection successfully open");
});

router.route('/employees').get((req, res) => {
    Empployee.find((err, employees) => {
        if (err) {
            console.log(err)
            res.status(400, 'Request error ' + err)
        } else
            res.json(employees);
    });
});

router.route('/employees/add').post((req, res) => {
    let employee = new Employee(req.body);
    employee.save()
        .then(employee => {
            res.status(200).json({'issue': 'Employee added successfully. ID is ' + employee._id});
        })
        .catch(err => {
            res.status(400).send('Failed to create new employee record: ' + err);
        });
});

app.use('/', router);
app.listen(4371, () => console.log('ExpressJS Server for loudparrot running on port 4371'));