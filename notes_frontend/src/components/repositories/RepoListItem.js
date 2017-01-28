import React, { Component } from 'react';
import { connect } from 'react-redux'
import * as actions from '../../actions'

class RepoListItem extends Component {
  handleClick(ev) {
    const { repo, fetchRepo, user, viewMode, ajaxStart } = this.props;
    ajaxStart();
    fetchRepo(repo, user._id, viewMode);
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
  return {
    user: state.user.attributes,
    viewMode: state.selections.viewMode
  }
}

export default connect(mapStateToProps, actions)(RepoListItem);
