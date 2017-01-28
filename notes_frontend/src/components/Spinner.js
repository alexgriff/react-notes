import React from 'react';
// from http://loading.io/

export default (props = {width: 50}) => {
  return <img src="oval.svg" width={props.width} alt="spinner" className="spinner" />
}
