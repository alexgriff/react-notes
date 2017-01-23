import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReposSidebar from './ReposSidebar';
import RepoShow from './RepoShow';
import HighlightSelector from './HighlightSelector';
import ViewModeToggler from './ViewModeToggler';

import * as actions from '../../actions'

class ReposMain extends Component {

  fetchData() {
    if (this.props.user && !this.props.repos.length) {
      this.props.fetchAllRepos();
    }
  }

  componentDidMount() {
    this.fetchData();
  }


  componentDidUpdate() {
    this.fetchData();
  }

  handleChange(ev) {
    console.log('in the handle change');
    console.log(ev.target.value);
  }

  renderBottomToolBar() {
    if (this.props.user) {

      if (this.props.viewMode) {
        return <ViewModeToggler onClick={this.props.toggleMode} />
      } else {
        return <HighlightSelector />
      }

    }
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
        { this.renderBottomToolBar() }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    repos: state.repos.repos,
    selectedRepo: state.repos.selectedRepo,
    authenticated: state.auth.authenticated,
    user: state.user.attributes,
    viewMode: state.selections.viewMode
  }
}

export default connect(mapStateToProps, actions)(ReposMain);
