const express = require("express");
const router = express.Router();


// @route /api/posts
// @desc testing routes
// @status Public route
router.get('/', (req, res) => {
    res.json({
        message: "posts route is working"
    })
})


module.exports = router;