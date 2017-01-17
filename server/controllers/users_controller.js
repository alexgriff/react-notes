const User = require('../models/user');

module.exports = {

  show(req, res) {
    User.findById(req.params.id)
      .then( user => {
        res.send(user);
      })
      .catch( error => {
        res.send({
          error: 'could not find a user with that id'
        });
      });
  },

  update(req, res) {
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
      });
  }

}
