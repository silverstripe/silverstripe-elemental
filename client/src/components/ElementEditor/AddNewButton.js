import React, { Component, PropTypes } from 'react';
import { InputGroup, Input, InputGroupAddon, Button } from 'reactstrap';
import i18n from 'i18n';

class AddNewButton extends Component {
  constructor(props) {
    super(props);

    this.handleTypeChange = this.handleTypeChange.bind(this);
    this.getButtonHref = this.getButtonHref.bind(this);

    this.state = {
      selectedType: null,
    };
  }

  /**
   * Set the current state to the new selected type
   * @param event
   */
  handleTypeChange(event) {
    const type = event.target ? event.target.value : null;

    this.setState(() => ({
      selectedType: type,
    }));
  }

  /**
   * Return the href for the "add" link - based on the currently selected block type
   * @returns {string}
   */
  getButtonHref() {
    const { selectedType } = this.state;

    if (!selectedType) {
      return '#';
    }

    return this.props.baseEditHref + selectedType;
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
      <option value={type.value}>{type.title}</option>
    ));
  }

  /**
   * @returns {DOMElement}
   */
  render() {
    return (
      <InputGroup className="elemental-editor__add-new-block-control">
        <Input type="select" className="no-change-track" onChange={this.handleTypeChange}>
          <option>{i18n._t('AddNewButton.SELECT', '(Select type to create)')}</option>
          { this.renderOptions() }
        </Input>
        <InputGroupAddon addonType="append">
          <Button href={this.getButtonHref()} tag="a" color="primary" className="font-icon-plus">
            {i18n._t('AddNewButton.ADD', 'Add')}
          </Button>
        </InputGroupAddon>
      </InputGroup>
    );
  }
}

AddNewButton.defaultProps = {};
AddNewButton.propTypes = {
  baseEditHref: PropTypes.string.isRequired,
  elementTypes: PropTypes.array.isRequired,
};

export default AddNewButton;
