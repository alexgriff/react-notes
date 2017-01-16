import React, { Component } from 'react';

import './RepoShow.css';

class RepoShow extends Component {

  handleClick() {
    alert('hi')
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
        {key: i, onClick: this.handleClick},
        node.contents)
    });
  }

  render() {
    return (
      <div className="RepoShow col-md-9">
        <div className="repo-content">
          {this.renderContent()}
        </div>
      </div>
    );
  }

}

export default RepoShow
