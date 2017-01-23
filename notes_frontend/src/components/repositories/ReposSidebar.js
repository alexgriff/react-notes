import React, { Component } from 'react';
import FilteredRepos from './FilteredRepos';
import Spinner from '../Spinner';

import './ReposSidebar.css';

class ReposSidebar extends Component {
  constructor() {
    super();

    this.state = {
      searchTerm: ""
    };
  }

  handleChange(ev) {
    this.setState({
      searchTerm: ev.target.value
    })
  }

  render() {
    return (
      <div className="RepoSidebar col-xs-3">
        <div className="input-group">

          <input
            onChange={this.handleChange.bind(this)}
            value={this.state.searchTerm}
            type="text"
            className="form-control sidebar"
            placeholder="Search your Repos"
            aria-describedby="basic-addon3" />

          <span className="input-group-addon" id="basic-addon3">
            <span className="glyphicon glyphicon-search"></span>
          </span>

        </div>

        <hr></hr>

        <FilteredRepos
          searchTerm={this.state.searchTerm}
          repos={this.props.repos} />

        { this.props.repos.length ? null : <Spinner /> }

      </div>
    )
  }
}

export default ReposSidebar;
