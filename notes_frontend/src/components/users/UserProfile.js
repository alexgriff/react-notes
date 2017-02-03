import React, { Component } from 'react';
import { connect } from 'react-redux';
import Spinner from '../Spinner';
import * as actions from '../../actions';

import './UserProfile.css'

class UserProfile extends Component {

  constructor(props) {
    super();

    this.state = {suffix: ''}
  }

  renderForm() {
    return (
      <div className="container-fluid profile">
        {this.renderUserAttributes()}
        <label><h3>What is the cohort-name your Learn readings & labs end with?</h3></label>
        <h4>Examples:</h4>
        <h4>/flatiron-bnb-methods-<em><span className="highlight-note color2">web-0916</span></em></h4>
        <h4>/rails-github-api-lab-<em><span className="highlight-note color2">v-000</span></em></h4>
        <div className="input-group">
          <span className="input-group-addon" id="basic-addon3">github.com/learn-co-students/rails-form_for-lab-</span>
          <input
            type="text"
            className="form-control input-lg"
            id="basic-url"
            aria-describedby="basic-addon3"
            placeholder="wdf-000"
            value={this.state.suffix}
            onChange={this.handleChange.bind(this)} />
        </div>
        <button
          className="btn btn-success btn-lg"
          onClick={this.handleLoadClick.bind(this)} >
            Load
        </button>


        <div className="update-repos-message">
          <h3>Don't see all of your cohort's labs?</h3>
          <button
            className="btn btn-danger btn-lg"
            onClick={this.handleUpdateClick.bind(this)} >
              Update
          </button>
        </div>

      </div>
    );
  }

  renderUserAttributes() {
    const { user } = this.props;
    if (user) {
      return (
        <div>
          <h1>{user.username}</h1>
          {
            user.suffix ?
            <h3> {user.suffix} </h3> :
            <h4><i>please enter your cohort's name below</i></h4>
          }
          <img className="avatar-md"
            src={user.avatarUrl}
            alt="User Avatar"/>
        </div>
      );
    }
  }

  renderLoader() {
    return(
      <div className="container-fluid profile">
        <Spinner width={200} />
        <h2>Fetching all your Repositories...</h2>
      </div>
    );
  }

  handleChange(ev) {
    let text = ev.target.value;
    this.setState({suffix: text})
  }

  handleLoadClick() {
    const { suffix } = this.state;
    if(suffix.length) {
      this.props.initRepos(this.state.suffix, this.props.user._id);
    }
  }

  handleUpdateClick() {
    const suffix = this.props.user.suffix;
    this.props.updateRepos(suffix);
  }

  render() {
    return (
      <div className="UserProfile container-fluid">
        {!this.props.awaitingAJAX ? this.renderForm() : this.renderLoader()}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user.attributes,
    awaitingAJAX: state.repos.awaitingAJAX
  };
};

export default connect(mapStateToProps, actions)(UserProfile);
