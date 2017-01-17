const passportService = require('../services/passport');
const passport = require('passport');

const UsersController = require('../controllers/users_controller');
const ReposController = require('../controllers/repos_controller');
const HighlightsController = require('../controllers/highlights_controller');

CLIENT_URL = 'http://localhost:3002';

module.exports = (app) => {

  // REPOS
  app.get('/api/repos', ReposController.index);

  // USERS
  app.get('/api/users/:id', UsersController.show);

  app.put('/api/users/:id', UsersController.update);

  // HIGHLIGHTS
  app.post('/api/highlights', HighlightsController.create);

  // AUTH
  app.get('/auth/github',
    passport.authenticate('github'));

  app.get('/auth/github/callback',
    passport.authenticate('github', {failureRedirect: '/fail'}),
    function(req, res) {
      const session = req.session.passport.user;
      res.redirect(`${CLIENT_URL}?_id=${session.userFromDb._id}&token=${session.accessToken}`)
    }
  );

  app.get('/fail', function(req, res) {
    res.send({error: 'how did we get here'});
  });
};
