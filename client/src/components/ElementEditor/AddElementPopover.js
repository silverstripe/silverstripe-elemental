import React, { Component, PropTypes } from 'react';
import { Button, Input, InputGroup, InputGroupAddon, Popover } from 'reactstrap';
import classNames from 'classnames';
import i18n from 'i18n';
import { elementConfigProvider } from 'state/editor/getElementConfig';

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
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.getElementButtonClickHandler = this.getElementButtonClickHandler.bind(this);

    this.state = {
      searchValue: ''
    };
  }

  /**
   * click handler that preserves the details of what was clicked
   * @param {object} elementType in the shape of types/elmementTypeType
   * @returns {function}
   */
  getElementButtonClickHandler(elementType) {
    return (event) => {
      const {
        actions: { handleAddElementToArea },
        elementalAreaId,
        insertAfterElement
      } = this.props;

      event.preventDefault();
      handleAddElementToArea(elementType.name.replace(/-/g, '\\'), elementalAreaId, insertAfterElement);
      this.handleToggle();
    };
  }

  /**
   * Allow closure via `esc` from within popover
   */
  handleKeyDown(event) {
    switch (event.key) {
      case 'Escape':
        this.handleToggle();
        break;
      default:
    }
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
    const { elementalAreaId } = this.props;
    const { searchValue } = this.state;

    let elementTypes = Object.values(elementConfigProvider().elementTypes);

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
          name={elementType.name}
          onClick={this.getElementButtonClickHandler(elementType)}
          elementalAreaId={elementalAreaId}
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
    const { container, extraClass, isOpen, placement, target } = this.props;
    const { searchValue } = this.state;
    const popoverClassNames = classNames(
      'element-editor-add-element',
      extraClass
    );

    return (
      <Popover
        className={popoverClassNames}
        container={container}
        hideArrow
        isOpen={isOpen}
        placement={placement}
        target={target}
        toggle={this.handleToggle}
        onKeyDown={this.handleKeyDown}
      >
        <InputGroup className="element-editor-add-element__search">
          <Input
            autoFocus
            className="element-editor-add-element__search-input"
            id="element-editor-add-element__search-input"
            onChange={this.handleSearchValueChange}
            placeholder={i18n._t('AddElementPopover.SEARCH_BLOCKS', 'Search blocks')}
            type="text"
            value={searchValue}
          />
          {this.renderClearLink()}
        </InputGroup>
        {this.renderAddElementPopoverContent()}
      </Popover>
    );
  }
}

AddElementPopover.propTypes = {
  container: PropTypes.oneOfType([PropTypes.string, PropTypes.func, PropTypes.object]),
  extraClass: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object]),
  isOpen: PropTypes.bool.isRequired,
  placement: PropTypes.string,
  target: PropTypes.oneOfType([PropTypes.string, PropTypes.func, PropTypes.object]).isRequired,
  toggle: PropTypes.func.isRequired,
  elementalAreaId: PropTypes.number.isRequired,
  insertAfterElement: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

export default AddElementPopover;
