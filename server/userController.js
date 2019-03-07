const bcrypt = require('bcryptjs');

const User = require('./userModel');


const userController = {};

userController.createUser = (req, res) => {
  User.create({
    name: req.body.name,
    username: req.body.username,
    password: req.body.password,
    favorite: [],
  })
  .then(resp=>{
    res.locals.data = {status: "success"};
    res.locals.data.id = resp._id;
    res.locals.data.favorite = [];
    res.json(res.locals.data);
  })
  .catch(err => {
    res.json({status: "duplicate"});
  });
}


userController.verifyUser = (req, res, next) => {
  User.findOne({username: req.body.username}).exec()
  .then(resp=>{
    if(!resp) {
      res.json({status: "not found"});
    }
    bcrypt.compare(req.body.password, resp.password, function(err, isMatch) {
      if (isMatch) {
        res.locals.data = {status: "success"};
        res.locals.data.id = resp._id;
        res.locals.data.favorite = resp.favorite;
        next();
      } else {
        res.json({status: "mismatch"});
      }
    });

  })
  .catch(err=>next(err));
}

userController.saveFavorite = (req, res, next) => {
  User.findByIdAndUpdate(req.body.id, {favorite: req.body.favorite}, (err, resp) => {
    if (err) next(err);
    res.json({status: "success"});
  });
}


module.exports = userController;