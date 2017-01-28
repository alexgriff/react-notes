import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReposSidebar from './ReposSidebar';
import RepoShow from './RepoShow';
import HighlightSelector from './HighlightSelector';
import ViewModeToggler from './ViewModeToggler';
import Spinner from '../Spinner'

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

  renderBody() {
    if (this.props.awaitingAJAX) {
      return <Spinner width={100}/>
    } else if (this.props.selectedRepo) {
      return <RepoShow repo={this.props.selectedRepo} />
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
