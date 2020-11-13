const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('./models/User');

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
app.use('/api/user', authRoute);

app.post('/signup', async (req, res, next) => {
    const newUser = new User({
        email: req.body.email,
        name: req.body.name,
        password: bcrypt.hashSync(req.body.password, parseInt(process.env.SALT))
    });

    console.log(newUser);

    try{
        const savedUser = await newUser.save();
        res.status(200).send(savedUser);
    } catch(err) {
        res.status(400).send(err);
        console.log(err);
    }
});

app.post('/login', (req, res, next) => {
    User.findOne({ email: req.body.email }, (err, user) => {
        if (err) return res.status(500).json({
            title: 'server error',
            error: err
        });

        if (!user) {
            return res.status(401).json({
                title: 'user not found',
                error: 'invalid credentials'
            });
        }

        if (!bcrypt.compareSync(req.body.password, user.password)) {
            return res.status(401).json({
                title: 'login failed',
                error: 'invalid credentials'
            });
        }

        let token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY);
        return res.status(200).json({
            title: 'login successful.',
            token: token
        });
    });
});

app.get('/user', (req, res, next) => {
    let token = req.header.token;
    console.log(req.header);
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) return res.status(401).json({
            title: 'unauthorized'
        });

        User.findOne({ _id: decoded.userId }, (err, user) => {
            if (err) return console.log(err);
            return res.status(200).json({
                title: 'user grabbed',
                user: {
                    email: user.email,
                    name: user.name
                }
            });
        });
    });
});

const port = process.env.PORT || 5000;

app.listen(port, (err) => {
    if(err) return console.log(err);
    console.log("Server is up and running on port " + port)
});