const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

// Define our model
// ----------------
const repoSchema = new Schema({
  name: String,
  url: String
});

repoSchema.statics.findOrCreate = function(repo, cb){
    var repoObj = new this();
    this.findOne({name : repo.name},function(err,result){
        if(!result){
            repoObj.name = repo.name;
            repoObj.url = repo.url;
            repoObj.save();
        }else{
          cb(err, result);
        }
    });
};


// Create model class
// ------------------
const ModelClass = mongoose.model('repo', repoSchema);


// Export model
// ------------
module.exports = ModelClass;
