const express= require('express');
const app= express();
const PORT= 8080;
const{dbConnection}= require('./config/config');
const tasks = require('./routes/tasks')

dbConnection()

app.use('/tasks', tasks);



app.listen(PORT, ()=> console.log(`Server ${PORT}`));