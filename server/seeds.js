const Repo = require('./models/repo');
const axios = require('axios');
const parse = require('parse-link-header');

function seedWithoutExpress() {
  mongoose.connect('mongodb://localhost:notes/notes')
  seedRepos();
}


function seedRepos(){
  fetchRepos('https://api.github.com/search/repositories?q=-wdf-000 user:learn-co-students&per_page=100');
}

function fetchRepos(link) {
  let nextLink

  axios.get(link)
    .then( response => {

      // get link headers for pagination results
      let parsedLinkHeaders = parse(response.headers.link)
      if (parsedLinkHeaders.next) { nexlLink = parsedLinkHeaders.next.url }

      // create and save instances
      response.data.items.map( repo => {
        let repoAttr = {name: repo.name, url: repo.url};
        Repo.findOrCreate(repoAttr, function(err, repoFromDB) {});
      });

    // when first promise is resolved,
    // recursively follow next link if necessary
    }).then( () => {
      if (nextLink) {
        fetchRepos(nextLink);
      }
    });
}

module.exports = seedRepos
