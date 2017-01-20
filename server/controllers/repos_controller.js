const Repo = require('../models/repo');
const Highlight = require('../models/highlight');

module.exports = {

  index(req, res){
    Repo.find({}).then( repos => {
      res.send({repos: repos});
    });
  },

  show(req, res){
    Highlight.find({repo: req.params.repoId, user: req.params.userId}).count()
      .then(count => {
        res.send({count: count})
      });
  }
}
