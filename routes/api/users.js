const express = require("express");
const router = express.Router();
const User = require('../../models/Users');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');


// @route /api/users/
// @desc testing routes
// @status Public route
router.get('/test', (req, res) => {
    res.json({
        message: "user route is working"
    })
});

// @route /api/users/register
// @desc Register route
// @status Public route
router.post('/register', (req, res) => {
    User.findOne({
        email: req.body.email
    }).then(user => {
        if (user) {
            return res.json({
                error: "Email already exist"
            })
        } else {
            const avatar = gravatar.url(req.body.email, {
                s: '200', //size
                r: 'pg', //rating
                d: 'mm' //default
            })

            const userSchema = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                avatar,
            });

            userSchema.save().then(user => res.json(user)).catch(err => res.json(err, "error occoured"))
        }
    })
});


module.exports = router;