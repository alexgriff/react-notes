import React, { Component } from 'react';
import { connect } from 'react-redux'
import * as actions from '../actions'

class RepoListItem extends Component {
  handleClick(ev) {
    const { repo, showRepo } = this.props;
    showRepo(repo.url, repo.name)
  }

  render() {
    const { repo } = this.props;

    return (
      <li className="list-group-item repo-name">
          <span
            onClick={this.handleClick.bind(this)}
            style={{cursor:'pointer'}} >
              {repo.name}
            </span>
      </li>
    );
  }
}

export default connect(null, actions)(RepoListItem);
