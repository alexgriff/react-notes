import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReposSidebar from './ReposSidebar';
import RepoShow from './RepoShow';
import HighlightSelector from './HighlightSelector';
import ViewModeToggler from './ViewModeToggler';
import Spinner from '../Spinner'

import * as actions from '../../actions'

import './ReposMain.css'

class ReposMain extends Component {

  fetchData() {
    const { user, repos, fetchAllRepos } = this.props;

    if (user && !repos.length) {
      fetchAllRepos(user.suffix);
    }

  }

  componentDidMount() {
    this.fetchData();
  }


  componentDidUpdate() {
    this.fetchData();
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

  renderBody() {
    if (this.props.awaitingAJAX) {
      return (
        <div>
          <Spinner width={100}/>
          <h3 className="ajax-loading">Loading...</h3>
        </div>
      );
    } else if (this.props.selectedRepo) {
      return <RepoShow repo={this.props.selectedRepo} />
    } else {
      return (
        <div className="container-fluid col-md-9">
          <div className="well empty-instructions">
            <h2>
              Find and click on the name of a repository to get started taking notes
            </h2>
            <h4>
              The highlight selector at the bottom of the screen provides three different colored highlighters. You can edit the labels of each to organize your notes.
            </h4>
            <h4>Select a highlighter, select the text of a reading, if the selection is valid you will be able to save your highlight</h4>
          </div>
        </div>
      );
    }
  }

  render() {
    return (
      <div className="UserShow">
        <div className="repo-info-container row">
          <ReposSidebar repos={this.props.repos} />
          {
            this.renderBody()
          }
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
    awaitingAJAX: state.repos.awaitingAJAX,
    authenticated: state.auth.authenticated,
    user: state.user.attributes,
    viewMode: state.selections.viewMode
  }
}

export default connect(mapStateToProps, actions)(ReposMain);
