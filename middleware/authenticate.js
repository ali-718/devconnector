const User = require("../models/Users");

var authenticate = (req, res, next) => {
    var token = req.header("x-auth");

    User.findByToken(token).then(user => {
        if (!user) {
            return res.json({
                err: "Please login to continue"
            })
        }
        req.user = user;
        next();
    }).catch(e => {
        res.status(400).json(e)
    })
}

module.exports = authenticate;