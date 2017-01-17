import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import * as actions from '../actions';
import { COLORS } from '../constants';

import './HighlightSelector.css';


class HighlightSelector extends Component {

  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    // console.log('clicked!');
    // TODO do something
  }


  renderFields() {
    // throttle the onChange event so less ajax requests
    const updateLabel = _.debounce((label, index, userId) =>
      {this.props.handleUpdateLabel(label, index, userId)}, 500);


    return this.props.highlighters.map( (highlighter, i) => {
      let focused;
      if (this.props.highlighter) {
        if (i === this.props.highlighter.index) {
          if (this.props.highlighter.focus) {
            focused = 'focused';
          }
        }
      }

      return (
        <div key={i} className="highlight-bar" >
          <span className="highlighter-field">
              <button
                className={`btn btn-default ${COLORS[i]} ${focused}`}
                onClick={ () => this.props.handleHighlighterClick(i) } >
                <span className="glyphicon glyphicon-pencil"></span>
              </button>
          </span>
          <input
            type="text"
            className="highlighter-field"
            defaultValue={highlighter.label}
            onChange={ event =>
              updateLabel(event.target.value, i, this.props.user._id)} />
        </div>
      );
    });
  }

  render() {
    console.log(this.props.user);
    const saveBtnColor = this.props.highlighter ? COLORS[this.props.highlighter.index] : null

    return (
      <div className="HighlightSelector container-fluid highlight-header">
          { this.renderFields() }
        <button
          className={`save-btn btn btn-default ${saveBtnColor}`}
          disabled={!this.props.highlighter.validSelection}
          onClick={this.handleClick} >
            Save Your Highlight
        </button>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user.attributes,
    // userId: state.user.attributes.githubId,
    highlighters: state.user.attributes.highlighters,
    highlighter: state.highlighter,
    selectedRepo: state.repos.selectedRepo
  }
}

export default connect(mapStateToProps, actions)(HighlightSelector);
