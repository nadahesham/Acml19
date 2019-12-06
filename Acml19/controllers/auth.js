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
  user
  res.status(200).json({
    "error": false,
    "uid": user._id,
    "user": {
        "name": user.name,
        "email": user.email,
        "created_at": user.created,
        "updated_at": null
    }
});
};
exports.signin = async (req, res) => {
  const userExists = await User.findOne({ email: req.body.email });

  if (userExists && userExists.hashed_password === req.body.hashed_password){
    const token = jwt.sign({_id:userExists._id},"SDFGHJNBVCDSWERTYHGBVCXZSWERTYHGVCXSWERT")
   res.cookie("t",token,{expire : new Date()+9999})
    return res.status(200).json( {  "error": false,
    "token" : token,
    "uid": userExists._id,
    "user": {
        "name": userExists.name,
        "email": userExists.email,
        "created_at": userExists.created,
        "updated_at": null
    }}
    );

}
  else
    return res.status(403).json({
      error: "password is incorrect"
    });
};
