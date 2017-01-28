// adapted from Stephen Grider Adavanced React Redux Udemy Course
// https://github.com/StephenGrider/AdvancedReduxCode
import React, { Component } from 'react';
import { connect } from 'react-redux';

export default function(ComposedComponent) {
  class Authentication extends Component {

    static contextTypes = {
      router: React.PropTypes.object
    }

    componentWillMount() {
      if(!this.props.authenticated) {
        this.context.router.push('/');
      }
    }

    componentWillUpdate(nextProps) {
      if(!nextProps.authenticated) {
        this.context.router.push('/');
      }
    }

    render() {
      return <ComposedComponent {...this.props} />
    }
  }

  function mapStateToProps(state) {
    return {authenticated: state.auth.authenticated}
  };

  return connect(mapStateToProps)(Authentication);
}

// In some other file we want to use this Higher Order Component(HOC)
// HOC: a function that is called with an existing component
// ------
// import Authentication <- HOC
// import Resources <- component you want to wrap

// const ComposedComponent = Authentication(Resources);


// in some render method:
// ...
// <ComposedComponent />
