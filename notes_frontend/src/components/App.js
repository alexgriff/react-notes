import React, { Component } from 'react';
import Header from './Header';
import { connect } from 'react-redux';
import * as actions from '../actions';


// from http://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript
const getParams = query => {
  if (!query) {
    return { };
  }
  return (/^[?#]/.test(query) ? query.slice(1) : query)
    .split('&')
    .reduce((params, param) => {
      let [ key, value ] = param.split('=');
      params[key] = value ? decodeURIComponent(value.replace(/\+/g, ' ')) : '';
      return params;
    }, { });
};


class App extends Component {

  componentDidMount() {
    if(window.location.search) {
      const queryParams = getParams(window.location.search)
      this.props.signinUser(queryParams._id, queryParams.token);
    }
  }

  render() {
    return (
      <div className="App container-fluid">
        <Header />

        {this.props.children}
      </div>
    );
  }
}

export default connect(null, actions)(App);
