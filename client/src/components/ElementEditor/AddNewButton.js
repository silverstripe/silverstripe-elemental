import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import i18n from 'i18n';
import { elementTypeType } from 'types/elementTypeType';
import { inject } from 'lib/Injector';

class AddNewButton extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);

    this.state = {
      popoverOpen: false
    };
  }

  toggle() {
    this.setState({
      popoverOpen: !this.state.popoverOpen
    });
  }

  /**
   * Render the add button for block types
   * @returns {DOMElement}
   */
  render() {
    const { AddElementPopoverComponent, elementTypes, areaId } = this.props;
    const buttonAttributes = {
      id: `ElementalArea${areaId}_AddButton`,
      color: 'primary',
      onClick: this.toggle,
      className: 'font-icon-plus',
    };

    return (
      <div>
        <Button {...buttonAttributes}>
          {i18n._t('ElementAddNewButton.ADD_BLOCK', 'Add block')}
        </Button>
        <AddElementPopoverComponent
          placement="bottom-start"
          target={buttonAttributes.id}
          isOpen={this.state.popoverOpen}
          elementTypes={elementTypes}
          toggle={this.toggle}
          areaId={areaId}
          insertAfterElement={0}
        />
      </div>
    );
  }
}

AddNewButton.defaultProps = {};
AddNewButton.propTypes = {
  elementTypes: PropTypes.arrayOf(elementTypeType).isRequired,
  areaId: PropTypes.number.isRequired,
};

export { AddNewButton as Component };

export default inject(
  ['AddElementPopover'],
  (AddElementPopoverComponent) => ({
    AddElementPopoverComponent,
  }),
  () => 'ElementEditor.ElementList.AddNewButton'
)(AddNewButton);
