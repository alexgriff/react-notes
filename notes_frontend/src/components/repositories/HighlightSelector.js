import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import * as actions from '../../actions';
import { COLORS } from '../../constants';

import './HighlightSelector.css';


class HighlightSelector extends Component {

  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const {
      highlighter,
      user,
      selectedRepo,
      saveHighlight
    } = this.props;

    saveHighlight(
      highlighter.selection,
      user._id,
      selectedRepo._id,
      highlighter.index,
      user.highlighters[highlighter.index].label
      )
  }


  renderFields() {
    // throttle the onChange event so less ajax requests
    const updateLabel = _.debounce((label, index, userId) =>
      {this.props.handleUpdateLabel(label, index, userId)}, 500);


    return this.props.user.highlighters.map( (highlighter, i) => {
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
    const saveBtnColor = this.props.highlighter ? COLORS[this.props.highlighter.index] : null

    return (
      <div className="HighlightSelector container-fluid highlight-header">
          { this.renderFields() }
        <button
          className={`save-btn btn btn-default ${saveBtnColor}`}
          disabled={!this.props.highlighter.selection.valid}
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
    highlighter: state.highlighter,
    selectedRepo: state.repos.selectedRepo
  }
}

export default connect(mapStateToProps, actions)(HighlightSelector);
