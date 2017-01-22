import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { API_ROOT } from '../constants';
import * as actions from '../actions';

import './Header.css';

class Header extends Component {

  getUserIfAuthenticated() {
    if (this.props.authenticated && !this.props.user) {
      this.props.fetchUser();
    }
  }

  componentDidMount() {
    this.getUserIfAuthenticated();
  }

  componentDidUpdate() {
    this.getUserIfAuthenticated();
  }

  handleSignOutClick(ev) {
    ev.preventDefault();
    this.props.signoutUser()
  }

  renderLinks() {
    if(this.props.authenticated && this.props.user) {

      return [
        <li key="0" >
          <a href="#" >
            <img className="user-thumbnail navbar-right"
              src={this.props.user.avatarUrl} alt="User" />
          </a>
        </li>,
        <li key="1" >
          <a href="#"
            className="app-link white"
            onClick={this.handleSignOutClick.bind(this)} >
            Sign Out
          </a>
        </li>
      ];

    } else {

      return [
        <li key="0" >
          <a href={`${API_ROOT}/auth/github`} >
            <img className="github-logo" src="GitHub-Mark-Light-32px.png" alt="Github Logo" />
          </a>
        </li>,
        <li key="1" >
          <a href={`${API_ROOT}/auth/github`} className="app-link white">Sign in with Github</a>
        </li>
      ];
    }
  }

  render() {
    // console.log('header props', this.props)
    return(
      <nav className="Header navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
            <Link to="/" className="navbar-brand app-link white">
              High<span className="highlight">Light</span>
            </Link>
          </div>

          <div className="collapse navbar-collapse">
            <ul className="nav navbar-nav">
              <li><Link to="/repos" className="app-link white" >Repos</Link></li>
              <li><Link to="/notes" className="app-link white" >Notes</Link></li>
            </ul>
            <ul className="nav navbar-nav navbar-right">
              { this.renderLinks() }
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = state => {
  return {
    authenticated: state.auth.authenticated,
    user: state.user.attributes
  };
};

export default connect(mapStateToProps, actions)(Header);
