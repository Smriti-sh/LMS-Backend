const express = require('express');
const mongoose = require('mongoose');
const crudRoute = require('./routes/crud.route');
const bodyParser = require('body-parser');
// const cors = require('cors');

const app = express();
require("dotenv").config();

// Middleware
app.use(bodyParser.json());
// app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/crud',crudRoute);
app.get('/',(req,res)=>{
    res.send('Hello from Node api server updated');
})

const PORT = process.env.PORT || 4001 ;

// app.listen(PORT,()=>{ console.log(`Server running on port ${PORT}`);});

mongoose.connect(
    process.env.MONGODB_URI
).then(() => {
    console.log('Connected to database!');
    app.listen(4001, () => {
      console.log('Server is running on port 4001');
    });
  })
  .catch((error) => {
    console.log('Connection failed!',error);
  });