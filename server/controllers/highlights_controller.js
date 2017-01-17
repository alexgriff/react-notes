const Highlight = require('../models/highlight');

module.exports = {
  create(req, res) {

    res.send(req.body)
  }
}

// req.body =>
// elementId:4
// highlighterIndex:2
// repoId:"587836dc865d1866da65b9d2"
// startIndex:74
// text:"noticed it every day you use"
// userId:"587b95cfd65cae21c2d0d2c0" 
