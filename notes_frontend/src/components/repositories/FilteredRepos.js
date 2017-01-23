import React from 'react';
import RepoListItem from './RepoListItem';

export default ({searchTerm, repos}) => {

  const filteredRepos = repos.filter( repo => (
    searchTerm ?
      repo.name.toLowerCase().includes(searchTerm.toLowerCase()) :
      repo
    )
  ).slice(0, 30);

  const repoLIs = filteredRepos.map( (repo, i) => (
    <RepoListItem key={i} repo={repo} />
  ));

  return (
    <ul className="list-group">
      { repoLIs }
      {
        repoLIs.length ?
        <li className="list-group-item">see more...</li> :
        null
      }
    </ul>
  )
}
