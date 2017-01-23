import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

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
        <div className="note-item" key={note._id}>
          <h3><i>"{note.text}"</i></h3>
          <ul>
            <li>Label: <i>{note.label}</i></li>
            <li>Taken On: <i>{note.createdAt}</i></li>
            <li>Repository: <a href="#">{note.repo.name}</a></li>
          </ul>
          <br />
        </div>
      );
    });
  }

  render() {
    return (
      <div className="container-fluid NotesIndex">
        <div className="notes-searchbar">
          TODO: add Search by time, repo, label
        </div>
        <div className="notes-index">
          { this.renderNotes() }
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
