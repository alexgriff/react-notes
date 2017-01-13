import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions'
import ReposSidebar from './ReposSidebar';
import RepoShow from './RepoShow';

class UserShow extends Component {


  componentDidUpdate() {
    if (this.props.user && !this.props.repos.length) {
      this.props.getRepos();
    }
  }

  render() {
    return (
      <div className="row UserShow">
        <ReposSidebar repos={this.props.repos} />
        <RepoShow repo={this.props.selectedRepo} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    repos: state.repos.repos,
    selectedRepo: state.repos.selectedRepo,
    authenticated: state.auth.authenticated,
    user: state.user.attributes
  }
}

export default connect(mapStateToProps, actions)(UserShow);
