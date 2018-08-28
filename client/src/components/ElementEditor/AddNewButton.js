import React, { Component, PropTypes } from 'react';
import { InputGroup, Input, InputGroupAddon, Button } from 'reactstrap';
import i18n from 'i18n';

class AddNewButton extends Component {
  constructor(props) {
    super(props);

    this.handleTypeChange = this.handleTypeChange.bind(this);

    this.state = {
      selectedType: null,
    };
  }

  /**
   * Set the current state to the new selected type
   * @param event
   */
  handleTypeChange(event) {
    const type = event.target
      ? this.props.elementTypes.find(
          candidateType => candidateType.value === event.target.value
        ) || null
      : null;

    this.setState(() => ({
      selectedType: type,
    }));
  }

  /**
   * Render the add button next to the dropdown for block types
   * @returns {DOMElement}
   */
  renderAddButton() {
    const { selectedType } = this.state;
    const buttonHref = selectedType ? `${this.props.baseAddHref}/${selectedType.value}` : '#';
    const title = selectedType
      ? i18n.inject(i18n._t('ElementalAddNewButton.TITLE', 'Add a "{type}" block'), { type: selectedType.title })
      : '';
    const buttonAttributes = {
      href: buttonHref,
      title,
      disabled: !selectedType,
      tag: 'a',
      color: 'primary',
      className: 'font-icon-plus',
    };

    return (
      <Button {...buttonAttributes}>
        {i18n._t('AddNewButton.ADD', 'Add')}
      </Button>
    );
  }

  /**
   * Render elemental block type options for a select
   * @returns {DOMElement}
   */
  renderOptions() {
    const { elementTypes } = this.props;

    if (!elementTypes) {
      return null;
    }

    return elementTypes.map(type => (
      <option key={type.value} value={type.value}>{type.title}</option>
    ));
  }

  /**
   * @returns {DOMElement}
   */
  render() {
    return (
      <InputGroup className="elemental-editor__add-new-block-control">
        <Input
          type="select"
          id="elemental-editor_add-new-block-control_select-dropdown"
          className="no-change-track custom-select"
          onChange={this.handleTypeChange}
        >
          <option>{i18n._t('AddNewButton.SELECT', '(Select type to create)')}</option>
          {this.renderOptions()}
        </Input>
        <InputGroupAddon addonType="append">
          {this.renderAddButton()}
        </InputGroupAddon>
      </InputGroup>
    );
  }
}

AddNewButton.defaultProps = {};
AddNewButton.propTypes = {
  baseAddHref: PropTypes.string.isRequired,
  elementTypes: PropTypes.array.isRequired,
};

export default AddNewButton;
