const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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
    res.locals.datda.name = resp.name;
    res.locals.data.favorite = [];
    const jwtCookie = jwt.sign({id: resp_id}, process.env.JWT_KEY);
    res.cookie('jwt', jwtCookie, {httpOnly: true});
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
        res.locals.data.name = resp.name;
        res.locals.data.favorite = resp.favorite;
        const jwtCookie = jwt.sign({id: resp._id}, process.env.JWT_KEY);
        res.cookie('jwt', jwtCookie, {httpOnly: true});
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

userController.checkCookie = (req, res, next) => {
  if (Object.entries(req.cookies).length === 0) {
    res.locals.status = "not found";
    next();
  }

  res.locals.searchLoc = req.cookies.loc;

  if (req.cookies.jwt) {
    jwt.verify(req.cookies.jwt, process.env.JWT_KEY, (err, decoded) => {
      res.locals.id = decoded.id;
      User.findById(decoded.id, (err, resp) => {
        if (err) next(err);
        if (!resp) {
          res.locals.status = "not found";
        } else {
          res.locals.status = "success";
          res.locals.name = resp.name;
          res.locals.favorite = resp.favorite;
          next();
        }
      })
    });
  }
}

userController.signout = (req, res, next) => {
  res.clearCookie('jwt');
  res.send('success');
}


module.exports = userController;