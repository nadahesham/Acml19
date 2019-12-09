const express = require('express') ;
const app = express();
const mongoose = require('mongoose') ;
const bodyParser = require('body-parser') ;
const cookieParser = require("cookie-parser");

const expressValidator = require('express-validator')
const dotenv = require('dotenv') ;
dotenv.config() ;
const DbConnectionString =process.env.MONGO_URI;
mongoose.connect(""+DbConnectionString,{ useNewUrlParser: true }).then(() => console.log("Db connected"))

mongoose.connection.on("error" , err =>{
console.log("db connection error")

})
const postRoutes = require('./routes/post.js') ;
const authRoutes = require("./routes/auth.js");

app.use(bodyParser.json())
app.use(cookieParser());

app.use(expressValidator()) ;
app.use('/' , postRoutes) ;
app.use("/", authRoutes);

const port = process.env.PORT ;
app.listen(port , function() {
    console.log("nodejs is now listening to port "+port)  


});