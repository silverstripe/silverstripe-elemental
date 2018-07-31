import React, { PureComponent } from 'react';
import { elementType } from 'types/elementType';
import { inject } from 'lib/Injector';

/**
 * The Element component used in the context of an ElementEditor shows the summary
 * of an element's details when used in the CMS, including ID, Title and Summary.
 */
class Element extends PureComponent {
  render() {
    const {
      element: { ID, Title, Summary, Type, IconClass, FileURL, Content },
      HeaderComponent,
      ContentComponent
    } = this.props;

    if (!ID) {
      return null;
    }

    return (
      <div className="element-editor__element">
        <HeaderComponent
          id={ID}
          title={Title}
          elementType={Type}
          fontIcon={IconClass}
        />
        <ContentComponent
          summary={Summary}
          fileUrl={FileURL}
          content={Content}
        />
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

export { Element as Component };

export default inject(
  ['ElementHeader', 'ElementContent'],
  (HeaderComponent, ContentComponent) => ({
    HeaderComponent, ContentComponent,
  }),
  () => 'ElementEditor.ElementList.Element'
)(Element);
