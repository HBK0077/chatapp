const express=require("express");
const path = require("path");
const cors=require("cors");
require('dotenv').config();
const bodyparser=require("body-parser");
const sequelize=require("./util/database");

const userDetails = require("./routes/user");

const app = express();

app.use(cors());
app.use(bodyparser.json());
app.use(userDetails);

sequelize.sync().then(()=>{
    app.listen(2000, ()=>{
        console.log("Server is lietning");
    });
})