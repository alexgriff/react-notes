const Highlight = require('../models/highlight');

module.exports = {
  create(req, res) {
    Highlight.create({
      elementId: req.body.elementId,
      startIndex: req.body.startIndex,
      highlighterIndex: req.body.highlighterIndex,
      text: req.body.text,
      user: req.body.userId,
      repo: req.body.repoId
    }).then( highlight => {
      res.send(highlight);
    }).catch( error => {
      res.send({error: error});
    });
  }
}
