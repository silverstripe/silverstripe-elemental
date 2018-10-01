import React, { Component, PropTypes } from 'react';
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
    const { AddElementPopoverComponent, elementTypes, baseAddHref } = this.props;
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
        <AddElementPopoverComponent
          placement="bottom-start"
          target={buttonAttributes.id}
          isOpen={this.state.popoverOpen}
          elementTypes={elementTypes}
          baseAddHref={baseAddHref}
          toggle={this.toggle}
        />
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
  ['AddElementPopover'],
  (AddElementPopoverComponent) => ({
    AddElementPopoverComponent,
  }),
  () => 'ElementEditor.ElementList.AddNewButton'
)(AddNewButton);
