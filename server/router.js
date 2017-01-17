const passportService = require('./services/passport');
const passport = require('passport');
const axios = require('axios');
const User = require('./models/user');
const Repo = require('./models/repo');
// const seedRepos = require('./seeds')


// add route handlers to express
module.exports = function(app) {

  app.get('/', function(req, res) {
    res.send({something: true})
  });

  app.get('/repos', function(req, res) {
    Repo.find({}).then( repos => {
      res.send({repos: repos});
    })
  });

  app.get('/users/:id', function(req, res) {
    console.log('user show');
    User.findById(req.params.id)
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
      const session = req.session.passport.user;
      res.redirect(`http://localhost:3002?_id=${session.userFromDb._id}&token=${session.accessToken}`)
    });


  app.get('/fail', function(req, res) {
    res.send({error: 'how did we get here'});
  });

  app.put('/users/:id', function(req, res) {

    const setModifier = {
      $set: {
        ['highlighters.' + req.body.highlighterIndex + '.label']: req.body.label
      }
    };

    User.findOneAndUpdate({githubId: req.params.id}, setModifier)
      .then( user => {
        res.send({user: user})
      })
      .catch( error => {
        res.send({error: error})
      })
  });
}
