import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import * as actions from '../actions';

import './HighlightSelector.css';

class HighlightSelector extends Component {


  renderFields() {
    // throttle the onChange event so less ajax requests
    const updateLabel = _.debounce((label, index, userId) =>
      {this.props.handleUpdateLabel(label, index, userId)}, 500)

    const colors = ["red", "blue", "green"]

    return this.props.highlighters.map( (highlighter, i) => {
      return (
        <div key={i} className="highlight-bar" >
          <span className="highlighter-field">
            <button className={`btn btn-default ${colors[i]}`}>
              <span className="glyphicon glyphicon-pencil"></span>
            </button>
          </span>
          <input
            type="text"
            className="highlighter-field"
            defaultValue={highlighter.label}
            onChange={ event =>
              updateLabel(event.target.value, i, this.props.userId)} />
        </div>
      );
    });
  }

  render() {
    return (
      <div className="HighlightSelector container-fluid highlight-header">
        { this.renderFields() }
        <button className="btn btn-default" disabled={true} >Save Your Highlight</button>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    userId: state.user.attributes.githubId,
    highlighters: state.user.attributes.highlighters
  }
}

export default connect(mapStateToProps, actions)(HighlightSelector);
