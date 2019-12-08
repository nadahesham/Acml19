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
exports.addMedicine = async (req, res) => {
  const user = await User.findOne({_id:req.body.userId });
  res.status(200).json({ error: false});
  if (user) {
    user.medicines.push({
      acqDate: req.body.acqDate,
      name: req.body.name,
      labeler: req.body.labeler,
      deaSchedule: req.body.deaSchedule,
      attribution: req.body.attribution,
      id: req.body.id,
      imageUrl: req.body.imageUrl,
      quantity: req.body.quantity
    });
    await user.save();
  } else
    return res.status(403).json({
      error: "not correct"
    });
};
exports.viewMedicine = async (req, res) => {
  const user = await User.findOne({ _id: req.body.userId });
  if (user) {
    return res.status(200).json({ medicines: user.medicines });
  } else
    return res.status(403).json({
      error: "not correct"
    });
};
