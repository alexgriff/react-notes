import React, { Component } from 'react';
import { connect } from 'react-redux'
import * as actions from '../actions'

class RepoListItem extends Component {
  handleClick(ev) {
    const { repo, fetchRepo, user } = this.props;
    fetchRepo(repo, user._id);
  }

  render() {
    const { repo } = this.props;

    return (
      <li className="list-group-item repo-name">
        <span onClick={this.handleClick.bind(this)} >
          {repo.name}
        </span>
      </li>
    );
  }
}

const mapStateToProps = state => {
  return {user: state.user.attributes}
}

export default connect(mapStateToProps, actions)(RepoListItem);
