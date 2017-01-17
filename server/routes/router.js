const passportService = require('../services/passport');
const passport = require('passport');

const UsersController = require('../controllers/users_controller');
const ReposController = require('../controllers/repos_controller');

CLIENT_URL = 'http://localhost:3002';

// add route handlers to express
module.exports = (app) => {

  app.get('/api/repos', ReposController.index);

  app.get('/api/users/:id', UsersController.show);

  app.put('/api/users/:id', UsersController.update);

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
