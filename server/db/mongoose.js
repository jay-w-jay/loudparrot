//Handles the mongodb connection logic

const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.set('useFindAndModify', false);

mongoose.connect('mongodb://localhost:27017/TaskManager', { useNewUrlParser: true}).then(() => {
    console.log("Connected to the database successfully");
}).catch((e) => {
    console.error("Could not open a connection to the database");
    console.error(e);
});

module.exports = {
    mongoose
};