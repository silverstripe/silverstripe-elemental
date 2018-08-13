/* global confirm */

import React, { Component, PropTypes } from 'react';
import { Tooltip } from 'reactstrap';
import { compose } from 'redux';
import { inject } from 'lib/Injector';
import deleteBlockMutation from 'state/editor/deleteBlockMutation';
import i18n from 'i18n';

class Header extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.handleDelete = this.handleDelete.bind(this);

    this.state = {
      tooltipOpen: false
    };
  }

  /**
   * Handle the deletion of a block, passing the block ID in
   */
  handleDelete(event) {
    event.stopPropagation();

    const { id, actions: { handleDeleteBlock } } = this.props;

    const deleteMessage = i18n._t(
      'ElementHeader.CONFIRM_DELETE',
      'Are you sure you want to delete this block?'
    );

    // eslint-disable-next-line no-alert
    if (handleDeleteBlock && confirm(deleteMessage)) {
      handleDeleteBlock(id);
    }
  }

  toggle() {
    this.setState({
      tooltipOpen: !this.state.tooltipOpen
    });
  }

  render() {
    const { id, title, elementType, fontIcon, FormActionComponent } = this.props;

    return (
      <div className="element-editor-header">
        <div className="element-editor-header__info">
          <div className="element-editor-header__icon-container">
            <i className={fontIcon} id={`element-editor-header__icon${id}`} />
            <Tooltip
              placement="top"
              isOpen={this.state.tooltipOpen}
              target={`element-editor-header__icon${id}`}
              toggle={this.toggle}
            >
              {elementType}
            </Tooltip>
          </div>
          <h3 className="element-editor-header__title">{title}</h3>
        </div>
        <FormActionComponent
          onClick={this.handleDelete}
          title={null}
          icon="trash-bin"
          attributes={{
            title: i18n._t('ElementHeader.DELETE', 'Delete'),
          }}
        />
      </div>
    );
  }
}

Header.propTypes = {
  id: PropTypes.number,
  title: PropTypes.string,
  elementType: PropTypes.string,
  fontIcon: PropTypes.string,
  actions: PropTypes.shape({
    handleDeleteBlock: PropTypes.func.isRequired,
  }),
  FormActionComponent: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
};

export { Header as Component };

export default compose(
  inject(
    ['FormAction'],
    (FormActionComponent) => ({
      FormActionComponent,
    }),
    () => 'ElementEditor.ElementList.Element'
  ),
  deleteBlockMutation
)(Header);
