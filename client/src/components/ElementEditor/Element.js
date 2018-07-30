import React, { PureComponent } from 'react';
import { elementType } from 'types/elementType';

/**
 * The Element component used in the context of an ElementEditor shows the summary
 * of an element's details when used in the CMS, including ID, Title and Summary.
 */
class Element extends PureComponent {
  render() {
    const { element: { ID, Title, Summary } } = this.props;

    if (!ID) {
      return null;
    }

    return (
      <div className="element-editor__element">
        <p>#{ID}: {Title}</p>
        <p>{Summary}</p>
      </div>
    );
  }
}

Element.propTypes = {
  element: elementType,
};

Element.defaultProps = {
  element: null,
};

export default Element;
