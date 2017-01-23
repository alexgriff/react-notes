const Highlight = require('../models/highlight');

module.exports = {

  create(req, res) {
    Highlight.create({
      elementId: req.body.elementId,
      startIndex: req.body.startIndex,
      highlighterIndex: req.body.highlighterIndex,
      text: req.body.text,
      user: req.body.userId,
      repo: req.body.repoId,
      label: req.body.label
    }).then( highlight => {
      res.send(highlight);
    }).catch( error => {
      res.send({error: error});
    });
  },

  show(req, res) {
    Highlight.find({repo: req.params.repoId, user: req.params.userId})
      .then(highlights => {
        res.send({highlights});
      });
  },

  index(req, res) {
    Highlight.find({user: req.params.id})
      .populate('repo')
      .then(highlights => {
        res.send({highlights});
      });
  }

}
