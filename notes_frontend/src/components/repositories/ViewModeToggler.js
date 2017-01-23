import React from 'react';
import './ViewModeToggler.css';

export default (props) => {
  return (
    <div className="ViewModeToggler">
      You are currently in Reading Mode
      <button
        className="btn btn-default"
        onClick={props.onClick}>
        Return to Highlight Mode
      </button>
    </div>
  )
}
