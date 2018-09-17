import React, { Component, PropTypes } from 'react';
import { compose } from 'redux';
import { DropdownItem } from 'reactstrap';
import { inject } from 'lib/Injector';
import AbstractAction from 'components/ElementActions/AbstractAction';

/**
 * Element actions is a dropdown menu containing links to inline editing forms for each
 * of the element's primary tabs, as well as operations such as save, publish, archive etc
 */
class ElementActions extends Component {
  /**
   * Render buttons for the edit form tabs that will be a part of the edit form (if they exist)
   *
   * @returns {DOMElement[]|null}
   */
  renderEditTabs() {
    const { editTabs } = this.props;

    if (!editTabs || !editTabs.length) {
      return null;
    }

    return editTabs.map(
      (tab) => <AbstractAction key={tab} title={tab} />
    );
  }

  /**
   * Renders a divider if there are CMS edit tabs and child actions
   *
   * @returns {DropdownItem|null}
   */
  renderDivider() {
    const { children, editTabs } = this.props;

    if (editTabs && editTabs.length && React.Children.count(children)) {
      return <DropdownItem divider />;
    }
    return null;
  }

  /**
   * If inline editing is enabled, render the "more actions" menu. Injector registrations can
   * define HOCs that add action components as children of this component.
   *
   * @returns {ActionMenuComponent|null}
   */
  render() {
    const { children, id, ActionMenuComponent } = this.props;

    const dropdownToggleClassNames = [
      'element-editor-header__actions-toggle',
      'btn',
      'btn-sm',
      'btn--no-text',
      'font-icon-dot-3',
    ];

    // Remove btn-icon-xl make btn-sm
    return (
      <ActionMenuComponent
        id={`element-editor-actions-${id}`}
        className={'element-editor-header__actions-dropdown'}
        dropdownMenuProps={{ right: true }}
        dropdownToggleClassNames={dropdownToggleClassNames}
        toggleCallback={(event) => event.stopPropagation()}
      >
        { this.renderEditTabs() }
        { this.renderDivider() }
        { children }
      </ActionMenuComponent>
    );
  }
}

ElementActions.propTypes = {
  id: PropTypes.string,
  editTabs: PropTypes.arrayOf(PropTypes.string),
};

ElementActions.defaultProps = {
  editTabs: [],
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

