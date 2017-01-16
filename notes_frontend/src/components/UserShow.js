import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions'
import ReposSidebar from './ReposSidebar';
import RepoShow from './RepoShow';
import HighlightSelector from './HighlightSelector';

class UserShow extends Component {


  componentDidUpdate() {
    if (this.props.user && !this.props.repos.length) {
      this.props.getRepos();
    }
  }


  handleChange(ev) {
    console.log('in the handle change');
    console.log(ev.target.value);
  }

  render() {
    return (
      <div className="UserShow">
        <div className="repo-info-container row">
          <ReposSidebar repos={this.props.repos} />
          { this.props.selectedRepo
            ? <RepoShow repo={this.props.selectedRepo} />
            : null }
        </div>
        { this.props.user ? <HighlightSelector /> : null }
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
