import React, { Component, PropTypes } from 'react';
import { Button, Popover, InputGroup, Input, InputGroupAddon } from 'reactstrap';
import classNames from 'classnames';
import { elementTypeType } from 'types/elementTypeType';
import i18n from 'i18n';

/**
 * The AddElementPopover component used in the context of an ElementEditor shows the
 * available elements that can be added to an ElementalArea.
 */
class AddElementPopover extends Component {
  constructor(props) {
    super(props);

    this.renderElementButtons = this.renderElementButtons.bind(this);
    this.renderAddElementPopoverContent = this.renderAddElementPopoverContent.bind(this);
    this.handleSearchValueChange = this.handleSearchValueChange.bind(this);
    this.handleClear = this.handleClear.bind(this);
    this.handleToggle = this.handleToggle.bind(this);

    this.state = {
      searchValue: ''
    };
  }

  /**
   * Pass toggle to parent and clear the search input
   */
  handleToggle() {
    const { toggle } = this.props;

    toggle();
    this.handleClear();
  }

  /**
   * Handle click on clear button within search bar
   */
  handleClear() {
    this.setState(
      { searchValue: '' }
    );
  }

  /**
   * Update the internal state on user input change
   * @param event
   */
  handleSearchValueChange(event) {
    this.setState(
      { searchValue: event.target.value }
    );
  }

  /**
   * Render a link to clear the search field if user entered input
   * @returns {DOMElement}
   */
  renderClearLink() {
    const { searchValue } = this.state;

    if (searchValue.length === 0) {
      return null;
    }

    return (
      <InputGroupAddon addonType="append">
        <button
          className="element-editor-add-element__search-clear btn-link"
          onClick={this.handleClear}
        >
          {i18n._t('AddElementPopover.CLEAR', 'Clear')}
        </button>
      </InputGroupAddon>
    );
  }

  /**
   * Render either all blocks available, blocks matching the search term, or a message that there
   * are not matching block types
   * @returns {DOMElement}
   */
  renderElementButtons() {
    let { elementTypes } = this.props;
    const { searchValue } = this.state;

    if (searchValue.length !== 0) {
      elementTypes = elementTypes.filter((elementType) =>
        elementType.title.toLowerCase().includes(searchValue.trim().toLowerCase())
      );
    }

    if (elementTypes.length === 0) {
      return (
        <div className="element-editor-add-element__no-results">
          {i18n._t('AddElementPopover.NO_RESULTS', 'No results found')}
        </div>
      );
    }

    return elementTypes.map((elementType) =>
      (
        <Button
          className={
            classNames(
              elementType.icon,
              'btn--icon-xl',
              'element-editor-add-element__button'
            )
          }
          key={elementType.name}
          href={`${this.props.baseAddHref}/${elementType.name}`}
          onClick={this.handleToggle}
        >
          {elementType.title}
        </Button>
      )
    );
  }

  /**
   * Render the container for the add element popover content
   * @returns {DOMElement}
   */
  renderAddElementPopoverContent() {
    return (
      <div className="element-editor-add-element__button-container">
        {this.renderElementButtons()}
      </div>
    );
  }

  /**
   * Render the add element popover
   * @returns {DOMElement}
   */
  render() {
    const { isOpen, placement } = this.props;

    return (
      <Popover
        className="element-editor-add-element"
        placement={placement}
        isOpen={isOpen}
        target="AddButton"
        toggle={this.handleToggle}
        hideArrow

      >
        <InputGroup className="element-editor-add-element__search">
          <Input
            type="text"
            id="element-editor-add-element__search-input"
            className="element-editor-add-element__search-input"
            onChange={this.handleSearchValueChange}
            placeholder={i18n._t('AddElementPopover.SEARCH_BLOCKS', 'Search blocks')}
            value={this.state.searchValue}
            autoFocus
          />
          {this.renderClearLink()}
        </InputGroup>
        {this.renderAddElementPopoverContent()}
      </Popover>

    );
  }
}

AddElementPopover.propTypes = {

  elementTypes: PropTypes.arrayOf(elementTypeType),
  baseAddHref: PropTypes.string.isRequired,
  toggle: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  placement: PropTypes.string,
};

export default AddElementPopover;
