const mongoose = require('mongoose') ;
const uuidv1 = require('uuid/v1') 
const crypto = require('crypto')
const userSchema = new mongoose.Schema({

    name :{
      type :String ,
 //     trim : true ,
    required :true
    } ,
    email :{

        type :String ,
   //     trim :true ,
        required :true

    },
    hashed_password :{
        type :String ,
        required : true 
    },
    
    salt :String ,
    created :{
    type :Date ,
    default :Date.now

     }


}) ;
module.exports = mongoose.model("User" , userSchema)