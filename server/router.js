const passportService = require('./services/passport');
const passport = require('passport');
const axios = require('axios');
const User = require('./models/user');
const Repo = require('./models/repo');
// const seedRepos = require('./seeds')


// add route handlers to express
module.exports = function(app) {

  app.get('/', function(req, res) {
    // seedRepos();
    res.send({something: true})
  });

  app.get('/repos', function(req, res) {
    Repo.find({}).then( repos => {
      res.send({repos: repos});
    })
  });

  app.get('/users/:id', function(req, res) {
    console.log('user show');
    User.findOne({_id: req.params.id})
      .then( user => {
        res.send(user);
      })
      .catch( error => {
        res.send({
          error: 'could not find a user with that id'
        });
      });
  });

  app.get('/auth/github',
    passport.authenticate('github'));

  app.get('/auth/github/callback',
    passport.authenticate('github', {failureRedirect: '/fail'}),
    function(req, res) {
      console.log('SESSION in auth callback: ', req.session);
      const session = req.session.passport.user;
      res.redirect(`http://localhost:3002?_id=${session.userFromDb._id}&token=${session.accessToken}`)
    });


  app.get('/fail', function(req, res) {
    res.send({error: 'how did we get here'});
  });
}
