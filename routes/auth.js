const router = require('express').Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');

router.post('/register', async (req, res) => {
    console.info(req.headers);
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });

    try{
        const savedUser = await user.save();
        res.send(savedUser);
    } catch(err) {
        res.status(400).send(err);
    }
});

router.post('/signup', async (req, res, next) => {
    console.info(req.headers);
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
        console.error(err);
    }
});

router.post('/login', (req, res, next) => {
    console.info(req.headers);
    User.findOne({ email: req.body.email }, (err, user) => {
        if (err) {
            console.error(err);

            return res.status(500).json({
                title: 'server error',
                error: err
            });
        }

        if (!user) {
            console.warn('User not found!');

            return res.status(401).json({
                title: 'user not found',
                error: 'invalid credentials'
            });
        }

        if (!bcrypt.compareSync(req.body.password, user.password)) {
            console.warn('invalid credentials!');

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

router.get('/user', (req, res, next) => {
    let token = req.headers.token;
    console.info(req.headers);
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) return res.status(401).json({
            title: 'unauthorized',
            error: err
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

router.get('/all', (req, res, next) => {
    let token = req.headers.token;
    console.info(req.headers);
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) return res.status(401).json({
            title: 'unauthorized',
            error: err
        });

        User.find({}, (err, users) => {
            if (err) return console.log(err);
            return res.status(200).json({
                title: 'user grabbed',
                users: users
            });
        });
    });
});

module.exports = router;