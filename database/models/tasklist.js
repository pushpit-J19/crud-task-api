const mongoose = require('mongoose');

// creating a schema (JSON format here and not table)
const TaskListSchema = new mongoose.Schema({
    // https://mongoosejs.com/docs/guide.html
    title : {
        type : String,
        minlength : 3,
        trim : true,
    }
});

// model
const TaskList = mongoose.model('TaskList', TaskListSchema);
// arg1 : name of the collection in the db, 2nd schema

module.exports = TaskList;