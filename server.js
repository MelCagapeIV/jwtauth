const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

//middlewares
app.use(bodyParser.json());
app.use(cors());

// import routes
const authRoute = require('./routes/auth');

dotenv.config();

// connect to DB
mongoose.connect(process.env.DB_CONNECTION, 
{ useUnifiedTopology: true, useNewUrlParser: true },
() => console.log('connected to db!'));

//route middlewares
const authPath = process.env.VUE_APP_AUTH_PATH;
app.use(authPath, authRoute);

const port = process.env.PORT || 5000;

app.listen(port, (err) => {
    if(err) return console.log(err);
    console.log("Server is up and running on port " + port)
});