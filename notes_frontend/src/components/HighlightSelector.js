import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import * as actions from '../actions';

import './HighlightSelector.css';

const COLORS = ["red", "blue", "green"]

class HighlightSelector extends Component {


  renderFields() {
    // throttle the onChange event so less ajax requests
    const updateLabel = _.debounce((label, index, userId) =>
      {this.props.handleUpdateLabel(label, index, userId)}, 500)

    return this.props.highlighters.map( (highlighter, i) => {
      return (
        <div key={i} className="highlight-bar" >
          <span className="highlighter-field">
            <button
              className={`btn btn-default ${COLORS[i]}`}
              onFocus={ () => this.props.handleHighlighterFocus(i) }
              onBlur={ () => this.props.handleHighlighterBlur(i) } >
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
    const saveColor = this.props.highlighter ? COLORS[this.props.highlighter.index] : null

    return (
      <div className="HighlightSelector container-fluid highlight-header">
        { this.renderFields() }
        <button
          className={`save-btn btn btn-default ${saveColor}`}
          disabled={!this.props.highlighter.focus} >
            Save Your Highlight
        </button>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    userId: state.user.attributes.githubId,
    highlighters: state.user.attributes.highlighters,
    highlighter: state.highlighter
  }
}

export default connect(mapStateToProps, actions)(HighlightSelector);
