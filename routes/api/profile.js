const express = require("express");
const router = express.Router();


// @route /api/profile
// @desc testing routes
// @status Public route
router.get('/', (req, res) => {
    res.json({
        message: "profile route is working"
    })
})


module.exports = router;