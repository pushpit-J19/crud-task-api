const express = require('express');
const app = express();

const mongoose = require('./database/mongoose')

/*
app.listen(3000, function(){
    console.log("express working, server started on port 3000");
});
*/
// ES6 syntax for above thing with arrow function
app.listen(3000, () => {
    console.log("express working, server started on port 3000!");
});