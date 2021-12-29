const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    title : {
        type : String,
        minlength : 3,
        trim : true,
    },
    _taskListId : {     // _ means private
        type: mongoose.Types.ObjectId,
        required: true
    },
    completed : {
        type : Boolean,
        default : false,
        required : true
    }
});

// model
const Task = mongoose.model('Task', TaskSchema);
// arg1 : name of the collection in the db, 2nd schema

module.exports = Task;