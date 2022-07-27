const passport = require('passport');

module.exports = function() {
  const User = require('../models/user');

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findOne({
      _id: id
    }, '-password -salt', (err, user) => { //DON'T bring password and salt fields
      done(err, user);
    });
  });

  require('./local')(); //uses other config file 'local' function
};