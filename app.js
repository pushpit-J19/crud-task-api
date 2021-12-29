const { response } = require('express');
const express = require('express');
const app = express();

const mongoose = require('./database/mongoose');

const TaskList = require('./database/models/tasklist');
const Task = require('./database/models/task');


// ==================================================================================================================

/*
 CORS : Cross Origin Request Security / resource sharing
    backend : http://localhost:3000
    frontend : http://localhost: 4200
    express js will only accept requests from backend 3000, and no other requests even frontend 4200
*/
// Allowing cors
// another middleware
// app.use(cors()); will allow all the cors, we want to allow some specifics
app.use(
    (request, response, next) => {
        response.setHeader("Access-Control-Allow-Origin", "http://localhost:4200"); // can use '*' instead of single origin
        response.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
        response.setHeader("Access-Control-Allow-Headers", 'Origin', "X-Requested-With,content-type");
        next();
    }
);

// to tell express to understand JSON
// this is an example of middleware
app.use(express.json());    // to not use 3rd party body parser



// ==================================================================================================================

// creating restful API endpoints which will come from browser
// or Routes
/*
    TaskList : create the list, update, read task list by id, read all task list
    Task : create, update, read by id, readd all tasks
*/

// Routes for TaskList model

// get all task lists
// eg. : http://localhost:3000/tasklists => [{}, {}, {}]
app.get('/tasklists', (req, res)=>{
    TaskList.find({})
        .then( (lists) => {
            res.status(200).send(lists);
        })
        .catch((error)=>{
            console.log("Error getting list", error);
            res.status(500);
        })
});


// Route to get a particular tasklist by id
app.get('/tasklists/:tasklistId', (req, res)=>{
    let tasklistId = req.params.tasklistId;
    TaskList.find({"_id":tasklistId})
        .then((taskList)=>{
            res.status(200).send(taskList);
        })
        .catch((error)=>{
            console.log("Error getting list", error);
            res.status(500);
        })
});


// Route or endpoint for creating a taskList with POST
app.post('/tasklists',(req, res)=>{
    console.log("Message from inside the post"); 
    let taskListObj = {'title' : req.body.title}
    TaskList(taskListObj).save()
        .then((lists) => {
            res.status(201).send(lists);
        })
        .catch((error) => {
            console.log("Error creating list", error);
            res.status(500);
        });
});


// Route to update a tasklist with put or patch
// put is update all the keys (full update)
// patch updates only a particular key value pair (partial update)
app.put('/tasklists/:tasklistId', (req, res)=>{
    TaskList.findOneAndUpdate(
        {"_id": req.params.tasklistId},     // condition to find the record
        { $set : req.body}
    )
        .then((taskList)=>{
            res.status(200).send(taskList);
        })
        .catch((error)=>{
            console.log("Error getting list", error);
            res.status(500);
        })
});
app.patch('/tasklists/:tasklistId', (req, res)=>{
    TaskList.findOneAndUpdate({"_id": req.params.tasklistId},{ $set : req.body})
        .then((taskList)=>{
            res.status(200).send(taskList);
        })
        .catch((error)=>{
            console.log("Error getting list", error);
            res.status(500);
        })
});


// Route to delete a task list based on id
app.delete('/tasklists/:tasklistId', (req, res)=>{
    TaskList.findByIdAndDelete(req.params.tasklistId)
        .then((taskList)=>{
            res.status(200).send(taskList);
        })
        .catch((error)=>{
            console.log("Error getting list", error);
            res.status(500);
        })
});


// ==================================================================================================================

/*
app.listen(3000, function(){
    console.log("express working, server started on port 3000");
});
*/
// ES6 syntax for above thing with arrow function
app.listen(3000, () => {
    console.log("express working, server started on port 3000!");
});