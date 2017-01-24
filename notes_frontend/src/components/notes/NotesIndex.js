import React, { Component } from 'react';
import { connect } from 'react-redux';
import { COLORS } from '../../constants'
import * as actions from '../../actions';

import './NotesIndex.css'

class NotesIndex extends Component {

  fetchData() {
    const {
      user,
      fetchAllUserHighlights,
      notes
    } = this.props;

    if (user && !notes.length) {
      fetchAllUserHighlights(user._id);
    }
  }

  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate() {
    this.fetchData()
  }

  renderNotes() {
    return this.props.notes.map( note => {
      return (
        <div className="note-item card" key={note._id} >
          <div className={`card-title ${COLORS[note.highlighterIndex]}`}>
            <h5><a href="">{note.repo.name}</a></h5>
          </div>
          <div className="container-fluid">
            <h3 className="note-text">
              <i>"{note.text}"</i>
            </h3>
          </div>
          <div className="card-bottom">
            <ul className="nav nav-pills">
              <li><a href="#">{note.label}</a></li>
              <li><a href="#">{note.createdAt}</a></li>
            </ul>
          </div>
        </div>
      );
    });
  }

  render() {
    return (
      <div className="container-fluid NotesIndex">
        <div className="col-md-5">
          <div className="notes-searchbar">
            TODO: add Search by time, repo, label
          </div>
          <div className="notes-index">
            { this.renderNotes() }
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user.attributes,
    notes: state.selections.notes
  }
}

export default connect(mapStateToProps, actions)(NotesIndex);
