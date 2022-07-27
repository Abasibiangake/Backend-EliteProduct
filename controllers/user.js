//Generic code taken from other COMP229 assignments

let User = require('../models/user');
let passport = require('passport');

//ERROR MESSAGES
function getErrorMessage(err) {
  console.log("===> Erro: " + err);
  let message = '';

  if (err.code) {
    switch (err.code) {
      case 11000:
      case 11001:
        message = 'Username already exists';
        break;
      default:
        message = 'Something went wrong';
    }
  } else {
    for (var errName in err.errors) {
      if (err.errors[errName].message) message = err.errors[errName].message;
    }
  }

  return message;
};

//SIGN-IN --> RENDER
module.exports.renderSignin = function(req, res, next) {
  if (!req.user) {
    res.render('auth/signin', {
      title: 'Sign-in',
      messages: req.flash('error') || req.flash('info')
    });
  } else {
    console.log(req.user);
    return res.redirect('/');
  }
};

//REGISTER PAGE --> RENDER
module.exports.renderRegistrationPage = function(req, res, next) {
  if (!req.user) {

    // creates a empty new user object.
    let newUser = User();

    res.render('auth/register', {
      title: 'Register',
      messages: req.flash('error'),
      user: newUser
    });

  } else {
    return res.redirect('/');//if already signed in, redirects to root of application
  }
};

//REGISTER --> PROCESS
module.exports.register = function(req, res, next) {
  if (!req.user && req.body.password === req.body.password_confirm) {
    console.log(req.body);

    let user = new User(req.body);
    user.provider = 'local';
    console.log(user);

    user.save((err) => {
      if (err) {
        let message = getErrorMessage(err);

        req.flash('error', message);
        return res.render('auth/register', {
          title: 'Register',
          messages: req.flash('error'),
          user: user
        });
      }
      req.login(user, (err) => {
        if (err) return next(err);
        return res.redirect('/');
      });
    });
  } else {
    return res.redirect('/');
  }
};

//SIGN-OUT
module.exports.signout = function(req, res, next) {
  req.logout(req.user, err => {
    if(err) return next(err);
    res.redirect("/");
  });
};

//AUTHENTICATE
module.exports.signin = function(req, res, next){
  passport.authenticate('local', {   
    successRedirect: req.session.url || '/',
    failureRedirect: '/users/signin',
    failureFlash: true
  })(req, res, next);
  delete req.session.url;
}

//UPDATE/MODIFY PAGE --> RENDER
module.exports.renderUpdatePage = (req, res, next) => {
    
    let id = req.params.id; 
  
    User.findById(id, (err, contactToUpdate) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            //show the update view
            res.render('users/update', {
              title: 'Update Contact Information',
              heading: 'UPDATE',
              contact: contactToUpdate
          })
        }
    });
  }
  
//UPDATE/MODIFY OWN INFO
module.exports.update = (req, res, next) => {
    
    let id = req.params.id

    let updatedInfo = User({
        _id: req.body.id,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        address: req.body.address,
        city: req.body.city,
        province: req.body.province,
        postal: req.body.postal,
        userName: req.body.userName,
        password: req.body.password      
    });

    User.updateOne({_id: id}, updatedInfo, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            res.redirect('/'); // ------------ REDIRECT SOMEWHERE ELSE???
        }
    });
}

