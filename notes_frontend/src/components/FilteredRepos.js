import React from 'react';
import RepoListItem from './RepoListItem';

export default ({filteredRepos}) => {
  const repos = filteredRepos.map( (repo, i) => (
    <RepoListItem key={i} repo={repo} />
  ));



  return (
    <ul className="list-group">
      { repos }
      {
        repos.length ? 
        <li className="list-group-item">see more...</li> :
        null
      }
    </ul>
  )
}
