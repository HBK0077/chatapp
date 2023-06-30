const express=require("express");
const path = require("path");
const fs = require("fs");
const cors=require("cors");
require('dotenv').config();
const bodyparser=require("body-parser");
const sequelize=require("./util/database");

const userDetails = require("./routes/user");
const messageDetails = require("./routes/message");
const groupDetails = require("./routes/group");
const usersofgroupDetails = require("./routes/viewusersofgroup");

const userTable =require("./models/user");
const messageTable = require("./models/message");
const groupTable = require("./models/group");
const usergroupsTable = require("./models/usergroups");
const app = express();

app.use(cors());
app.use(bodyparser.json());
app.use(userDetails);
app.use(messageDetails);
app.use(groupDetails);
app.use(usersofgroupDetails);
app.use((req,res)=>{
    res.sendFile(path.join(__dirname, `views/${req.url}`));
})

userTable.hasMany(messageTable);
messageTable.belongsTo(userTable);

groupTable.hasMany(messageTable);
messageTable.belongsTo(groupTable);

groupTable.belongsToMany(userTable,{through: usergroupsTable});
userTable.belongsToMany(groupTable,{through: usergroupsTable});

sequelize.sync().then(()=>{
    app.listen(2000, ()=>{
        console.log("Server is lietning");
    });
})