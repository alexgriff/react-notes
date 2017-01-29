import React, { Component } from 'react';
import { API_ROOT } from '../constants';
import { connect } from 'react-redux';
import * as actions from '../actions';

import './Welcome.css'

class Welcome extends Component {

  renderSignUp() {
    if (!this.props.authenticated) {
      return (
        <div className="sign-up">
          <h2 className="sign-up-text">
            Sign Up with Github to Get Started
          </h2>
          <a
            className="sign-up btn btn-success btn-lg"
            href={`${API_ROOT}/auth/github`}
            role="button" >
              Sign Up
          </a>
        </div>
      );
    } else {
      return <h2>Welcome</h2>
    }
  }


  renderInstructions() {
    return (
      <div className="instructions">
        <h1>Take Notes from your Learn.co Readings and Labs</h1>
        <h3>Search your repositories</h3>
        <img src="searchRepos.png" alt="search" width={200}/>
        <h3>Color-code your notes and provide custom labels</h3>
        <img src="redMarker.png" alt="red" width={600}/>
        <img src="blueMarker.png" alt="blue" width={600}/>
        <img src="greenMarker.png" alt="green" width={600}/>
        <h3>Save your Highlights</h3>
        <img src="saveHighlight.png" alt="save" width={600}/>
        <h3>Enter Reading Mode to see your notes from a particular reading</h3>
        <img src="showHighlights.png" alt="notes" width={600}/>
        <h3>Review and sort all your notes</h3>
        <img src="sortNotes.png" alt="sort" width={300}/>
      </div>
    );
  }

  render() {
    return (
      <div className="Welcome container-fluid">
        { this.renderSignUp() }
        <hr></hr>
        {this.renderInstructions()}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    authenticated: state.auth.authenticated
  }
};

export default connect(mapStateToProps, actions)(Welcome);
