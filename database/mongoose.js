// Connecting to the mongo db

const mongoose = require("mongoose");

mongoose.Promise = global.Promise;  // allows for connecting to db in async way

mongoose.connect('mongodb://127.0.0.1:27017/taskmanagerdb') 
    .then(()=> {
        console.log("db connected");
    })
    .catch((error)=>{
        console.log("error in connecting to db : ", error);
    });

module.exports = mongoose;