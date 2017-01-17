const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

const HighlightSchema = new Schema({
  elementId: Number,
  startIndex: Number,
  highlighterIndex: Number,
  text: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  repo: {
    type: Schema.Types.ObjectId,
    ref: 'repo'
  }
});

const Highlight = mongoose.model('highlight', HighlightSchema);

module.exports = Highlight;
