import React, { Component } from 'react';
import Text from './Text';
import Note from './Note';
import { connect } from 'react-redux';
import { COLORS } from '../../constants';
import * as actions from '../../actions';

import './RepoShow.css';

class RepoShow extends Component {

  handleClick() {
    const { fetchUserRepoHighlights, repo, user } = this.props;
    fetchUserRepoHighlights(repo._id, user._id);
  }

  renderHighlightInfo() {
    let viewButton;
    if (!this.props.selections.viewMode) {
      viewButton = (
        <a
          className="btn btn-primary btn-sm"
          onClick={this.handleClick.bind(this)} >View
        </a>
      );
    }

    return (
      <div className="show-header-container">
        <div className="info">
          <span className="name">{this.props.repo.name}</span>
          <div className="num-highlights">
            <span className="snippets">
              You have taken {this.props.repo.noteCount} notes from this reading
            </span>
            { viewButton }
          </div>
        </div>
      </div>
    );
  }

  renderCreateMode() {
    const { content } = this.props.repo;

    return content.map( (node, i) => {

      // render images
      if (node.element === "img") {
        return <img key={i}
          src={node.contents.src}
          alt={node.contents.alt}></img>
      }

      // render Text components
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

  renderViewMode() {
    const { content } = this.props.repo;

    return content.map( (node, i) => {

      // render images
      if (node.element === "img") {
        return <img key={i}
          src={node.contents.src}
          alt={node.contents.alt}></img>
      }

      // render Note components
      const elementSelections = this.props.selections.highlights
        .filter( selection => selection.elementId === i);
      return (
        <Note
          element={node.element}
          key={i}
          elementId={i}
          selections={elementSelections}
          contents={node.contents} />
        )
    });
  }

  render() {
    const color = this.props.highlighter.focus ? COLORS[this.props.highlighter.index] : 'none'
    return (
      <div className="RepoShow col-md-9" >

        {this.renderHighlightInfo()}

        <div className={`repo-content ${color}`} >
          { this.props.selections.viewMode ?
            this.renderViewMode() : this.renderCreateMode()
          }
        </div>

      </div>
    );
  }

}

const mapStateToProps = state => {
  return {
    highlighter: state.highlighter,
    repo: state.repos.selectedRepo,
    user: state.user.attributes,
    selections: state.selections
  };
};

export default connect(mapStateToProps, actions)(RepoShow)
