import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Text extends Component {

  handleMouseUp() {
    // 0 is falsey, this seems hacky
    if (typeof this.props.highlighter.index === "number") {
      const selection = window.getSelection().toString();
      if (selection) {
        const startIndex = this.props.contents.indexOf(selection);
        this.props.validateSelection(startIndex);
      }
    }
  }

  render() {
    const { element, contents } = this.props;

    return React.createElement(
      element,
      {onMouseUp: this.handleMouseUp.bind(this)},
      contents
    );
  }
}

export default connect(null, actions)(Text);
