import React, { Component } from 'react';
import Text from './Text';
import { connect } from 'react-redux';
import { COLORS } from '../constants';

import './RepoShow.css';

class RepoShow extends Component {

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

      return (
        <Text
          element={node.element}
          key={i}
          elementId={i}
          highlighter={this.props.highlighter}
          contents={node.contents} />
        )
    });
  }

  render() {
    const color = this.props.highlighter.focus ? COLORS[this.props.highlighter.index] : 'none'
    return (
      <div className="RepoShow col-md-9" >

        <div className="show-header-container">
          <div className="info">
            <span className="name">{this.props.repo.name}</span>
            <div className="num-highlights">
              <span className="snippets">
                You have taken 0 notes from this repository
              </span>
              <a className="btn btn-default btn-xs">{'<'}</a>
              <a className="btn btn-default btn-xs">{'>'}</a>
            </div>
          </div>
        </div>

        <div className={`repo-content ${color}`} >
          {this.renderContent()}
        </div>

      </div>
    );
  }

}

const mapStateToProps = state => {
  return {
    highlighter: state.highlighter,
    repo: state.repos.selectedRepo
  };
};

export default connect(mapStateToProps, ()=>({}))(RepoShow)
