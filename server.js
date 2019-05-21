const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const Port = process.env.Port || 5000;

const app = express();


//Bodypasres
app.use(bodyParser.json());

//DB
const db = require("./config/keys").mongoURI;

//connect to mongoDB
mongoose.connect(db).then(
    () => {
        console.log("success");
    },
    () => {
        console.log("failed");
    }
);

//Routes
const Posts = require('./routes/api/posts');
const Users = require('./routes/api/users');
const Profile = require('./routes/api/profile');

app.get("/", (req, res) => {
    res.send("hey crush");
});

app.use('/api/users', Users);
app.use('/api/posts', Posts);
app.use('/api/profile', Profile);

app.listen(Port, () => console.log(`app is running on port ${Port}`));