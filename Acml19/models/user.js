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

    medicines:[{
        acqDate: {type:String},
        name: {type:String,required:true},
        labeler: {type:String},
        deaSchedule: {type:String},
        attribution: {type:String},
        id: {type:String},
        imageUrl: {type:String}
    }],
    
    salt :String ,
    created :{
    type :Date ,
    default :Date.now

     }


}) ;
module.exports = mongoose.model("User" , userSchema)