const Repo = require('../models/repo');

module.exports = {

  index(req, res){
    Repo.find({}).then( repos => {
      res.send({repos: repos});
    });
  }
}
