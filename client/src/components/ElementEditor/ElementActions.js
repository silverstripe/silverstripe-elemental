import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { DropdownItem } from 'reactstrap';
import { inject } from 'lib/Injector';
import { elementType } from 'types/elementType';
import { elementTypeType } from 'types/elementTypeType';
import AbstractAction from 'components/ElementActions/AbstractAction';

/**
 * Element actions is a dropdown menu containing links to inline editing forms for each
 * of the element's primary tabs, as well as operations such as save, publish, archive etc
 */
const ElementActions = ({
  children,
  type,
  id,
  activeTab,
  editTabs = [],
  handleEditTabsClick,
  expandable = true,
  ActionMenuComponent,
}) => {
  /**
   * Set the active tab
   *
   * @param {Object} event
   */
  const handleEditTabsClickFn = (event) => {
    handleEditTabsClick(event.target.name);
  };

  /**
   * Render buttons for the edit form tabs that will be a part of the edit form (if they exist)
   *
   * @returns {HTMLElement[]|null}
   */
  const renderEditTabs = () => {
    // Don't render tabs if the block is not expandable or if no tabs are defined
    if (type.broken || !expandable || !editTabs || !editTabs.length) {
      return null;
    }

    return editTabs.map(
      ({ name, title }) =>
        (<AbstractAction
          key={name}
          name={name}
          title={title}
          type={type}
          onClick={handleEditTabsClickFn}
          active={name === activeTab}
        />)
    );
  };

  /**
   * Renders a divider if there are CMS edit tabs and child actions
   *
   * @returns {DropdownItem|null}
   */
  const renderDivider = () => {
    // Don't render divider if the block is not expandable or if no tabs are defined
    // or if there's no actions displayed after the tab list
    if (!expandable || !editTabs || !editTabs.length || React.Children.count(children) === 0) {
      return null;
    }

    return <DropdownItem divider role="separator" />;
  };

  const dropdownToggleClassNames = [
    'element-editor-header__actions-toggle',
    'btn',
    'btn-sm',
    'btn--no-text',
  ];

  return (
    <ActionMenuComponent
      id={`element-editor-actions-${id}`}
      className="element-editor-header__actions-dropdown"
      dropdownMenuProps={{ right: true }}
      dropdownToggleClassNames={dropdownToggleClassNames}
    >
      { renderEditTabs() }
      { renderDivider() }
      { children }
    </ActionMenuComponent>
  );
};

// There's some extra prop types in here for registered transformations to consume
ElementActions.propTypes = {
  // eslint-disable-next-line react/no-unused-prop-types
  element: elementType,
  type: elementTypeType.isRequired,
  // eslint-disable-next-line react/no-unused-prop-types
  areaId: PropTypes.number.isRequired,
  activeTab: PropTypes.string,
  editTabs: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    name: PropTypes.string,
  })),
  handleEditTabsClick: PropTypes.func.isRequired,
  expandable: PropTypes.bool,
  children: PropTypes.node,
  ActionMenuComponent: PropTypes.elementType.isRequired,
};

export { ElementActions as Component };

export default compose(
  inject(
    ['ActionMenu'],
    (ActionMenuComponent) => ({
      ActionMenuComponent,
    }),
    () => 'ElementEditor.ElementList.Element'
  )
)(ElementActions);
