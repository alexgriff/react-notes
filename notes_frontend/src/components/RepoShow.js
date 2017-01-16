import React, { Component } from 'react';
import { connect } from 'react-redux';
import { COLORS } from '../constants';

import './RepoShow.css';

class RepoShow extends Component {

  handleMouseUp() {
    // alert('hi')
  }

  renderContent() {
    const { content } = this.props.repo

    return content.map( (node, i) => {

      if (node.element === "img") {
        return React.createElement(
          node.element,
          { key: i,
            src: node.contents.src,
            alt: node.contents.alt
          },
          null
        );
      }

      return React.createElement(
        node.element,
        {key: i, onMouseUp: this.handleMouseUp},
        node.contents)
    });
  }

  render() {
    const color = this.props.highlighter.focus ? COLORS[this.props.highlighter.index] : 'none'
    return (
      <div className="RepoShow col-md-9" >
        <div className={`repo-content ${color}`} >
          {this.renderContent()}
        </div>
      </div>
    );
  }

}

const mapStateToProps = state => {
  return {
    highlighter: state.highlighter
  };
};

export default connect(mapStateToProps, ()=>({}))(RepoShow)
