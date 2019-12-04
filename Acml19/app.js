const express = require('express') ;
const app = express();
const mongoose = require('mongoose') ;
const bodyParser = require('body-parser') ;
const expressValidator = require('express-validator')
const dotenv = require('dotenv') ;
dotenv.config() ;
mongoose.connect("mongodb+srv://nadahesham:nH241971@cluster0-44tqr.mongodb.net/test?retryWrites=true&w=majority ",{ useNewUrlParser: true }).then(() => console.log("Db connected"))

mongoose.connection.on("error" , err =>{
console.log("db connection error")

})
const postRoutes = require('./routes/post.js') ;
app.use(bodyParser.json())
app.use(expressValidator()) ;
app.use('/' , postRoutes) ;
 
const port = 5000 ;
app.listen(port , ()=> {
    console.log("nodejs is now listening")  


});