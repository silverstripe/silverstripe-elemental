import React from 'react';
import striptags from 'striptags';

export default (props) => (
  <div className="element-editor-summary element-editor-summary--content">
    <p className="element-editor-summary__content">{ striptags(props.element.HTML) }</p>
  </div>
);
