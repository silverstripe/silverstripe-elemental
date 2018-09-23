import React, { Component, PropTypes } from 'react';
import { Button, Popover } from 'reactstrap';
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
    const { AddElementPopoverContentComponent, elementTypes, baseAddHref } = this.props;
    const buttonAttributes = {
      id: 'AddButton',
      color: 'primary',
      onClick: this.toggle
    };

    return (
      <div>
        <Button {...buttonAttributes}>
          {i18n._t('AddNewButton.ADD_BLOCK', 'Add block')}
        </Button>
        <Popover
          placement="bottom"
          isOpen={this.state.popoverOpen}
          target="AddButton"
          toggle={this.toggle}
          hideArrow
        >
          <AddElementPopoverContentComponent
            elementTypes={elementTypes}
            baseAddHref={baseAddHref}
          />
        </Popover>
      </div>
    );
  }
}

AddNewButton.defaultProps = {};
AddNewButton.propTypes = {
  baseAddHref: PropTypes.string.isRequired, // temp until elements can be added inline
  elementTypes: PropTypes.arrayOf(elementTypeType).isRequired,
};

export { AddNewButton as Component };

export default inject(
  ['AddElementPopoverContent'],
  (AddElementPopoverContentComponent) => ({
    AddElementPopoverContentComponent,
  }),
  () => 'ElementEditor.ElementList.AddNewButton'
)(AddNewButton);
