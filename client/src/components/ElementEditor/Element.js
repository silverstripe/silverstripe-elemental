import React, { PureComponent, PropTypes } from 'react';
import { elementType } from 'types/elementType';
import { inject } from 'lib/Injector';
import i18n from 'i18n';

/**
 * The Element component used in the context of an ElementEditor shows the summary
 * of an element's details when used in the CMS, including ID, Title and Summary.
 */
class Element extends PureComponent {
  render() {
    const {
      element: { ID, Title, BlockSchema },
      HeaderComponent,
      ContentComponent,
      link,
    } = this.props;
    const linkTitle = i18n.inject(
      i18n._t('ElementalElement.TITLE', 'Edit this {type} block'), { type: BlockSchema.type }
    );

    if (!ID) {
      return null;
    }

    return (
      <a className="element-editor__element" href={link} title={linkTitle}>
        <HeaderComponent
          id={ID}
          title={Title}
          elementType={BlockSchema.type}
          fontIcon={BlockSchema.iconClass}
        />
        <ContentComponent
          fileUrl={BlockSchema.fileURL}
          fileTitle={BlockSchema.fileTitle}
          content={BlockSchema.content}
        />
      </a>
    );
  }
}

Element.propTypes = {
  element: elementType,
  link: PropTypes.string.isRequired,
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
