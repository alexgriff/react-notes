import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions'
import ReposSidebar from './ReposSidebar';
import RepoShow from './RepoShow';
import HighlightSelector from './HighlightSelector';
import ViewModeToggler from './ViewModeToggler';

class ReposMain extends Component {


  componentDidUpdate() {
    if (this.props.user && !this.props.repos.length) {
      this.props.fetchAllRepos();
    }
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
