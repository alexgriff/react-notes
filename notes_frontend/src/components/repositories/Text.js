import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class Text extends Component {

  handleMouseUp() {
    const {
      highlighter,
      contents,
      elementId,
      validateSelection
    } = this.props;

    // 0 is falsey, this seems hacky
    if (typeof highlighter.index === "number") {
      const selection = window.getSelection().toString();
      if (selection) {
        const startIndex = contents.indexOf(selection);
        validateSelection(startIndex, elementId, highlighter.index, selection);
      }
    }
  }

  render() {
    const { element, contents } = this.props;

    return React.createElement(
      element,
      {
        onMouseUp: this.handleMouseUp.bind(this),
      },
      contents
    );
  }
}

export default connect(null, actions)(Text);
