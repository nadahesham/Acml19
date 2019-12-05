const jwt = require("jsonwebtoken") ;
//require('dotenv').config() ;

const User = require("../models/user");

exports.signup = async (req, res) => {
  const userExists = await User.findOne({ email: req.body.email });

  if (userExists)
    return res.status(403).json({
      error: "email is taken!"
    });

  const user = await new User(req.body);
  await user.save();
  res.status(200).json({ user });
};
exports.signin = async (req, res) => {
  const userExists = await User.findOne({ email: req.body.email });

  if (userExists && userExists.hashed_password === req.body.hashed_password){
    const token = jwt.sign({_id:userExists._id},"SDFGHJNBVCDSWERTYHGBVCXZSWERTYHGVCXSWERT")
   res.cookie("t",token,{expire : new Date()+9999})
    return res.status(200).json({token , userExists });}
  else
    return res.status(403).json({
      error: "password is incorrect"
    });
};
