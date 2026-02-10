import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Tooltip } from 'reactstrap';
import { elementType } from 'types/elementType';
import { elementTypeType } from 'types/elementTypeType';
import { compose } from 'redux';
import { inject } from 'lib/Injector';
import i18n from 'i18n';
import classNames from 'classnames';

const Header = ({
  element,
  type,
  areaId,
  previewExpanded,
  simple,
  disableTooltip,
  activeTab,
  expandable = true,
  ElementActionsComponent,
  handleEditTabsClick,
  sortableListeners,
  sortableAttributes,
  sortableActivatorRef,
  elementId,
}) => {
  const [tooltipOpen, setTooltipOpen] = useState(false);

  useEffect(() => {
    if (tooltipOpen && disableTooltip) {
      // This addresses an issue where the tooltip will stick around after dragging. The
      // ability to have a tooltip is back (props.disableTooltip) but the old state remains.
      setTooltipOpen(false);
    }
  }, [tooltipOpen, disableTooltip]);

  /**
   * Returns the title for this block
   *
   * @param {Object} elementParam
   * @param {Object} typeParam
   * @returns {string}
   */
  const getBlockTitle = (elementParam, typeParam) => {
    if (typeParam.broken) {
      return i18n.inject(
        i18n._t('ElementHeader.BROKEN', 'This element is of obsolete type {type}.'),
        { type: typeParam.obsoleteClassName }
      );
    }
    if (elementParam.title) {
      return elementParam.title;
    }
    return i18n.inject(
      i18n._t('ElementHeader.NOTITLE', 'Untitled {type} block'),
      { type: typeParam.title }
    );
  };

  const toggle = () => {
    setTooltipOpen((prevState) => !prevState);
  };

  /**
   * Renders a message indicating the current versioned state of the element
   *
   * @returns {DOMElement|null}
   */
  const renderVersionedStateMessage = () => {
    const {
      isLiveVersion,
      isPublished,
    } = element;

    // No indication required for published elements
    if (isPublished && isLiveVersion) {
      return null;
    }

    let versionStateButtonTitle = '';
    const stateClassNames = ['element-editor-header__version-state'];

    if (!isPublished) {
      versionStateButtonTitle = i18n._t('ElementHeader.STATE_DRAFT', 'Item has not been published yet');
      stateClassNames.push('element-editor-header__version-state--draft');
    } else if (!isLiveVersion) {
      versionStateButtonTitle = i18n._t('ElementHeader.STATE_MODIFIED', 'Item has unpublished changes');
      stateClassNames.push('element-editor-header__version-state--modified');
    }

    return (
      <span
        className={classNames(stateClassNames)}
        title={versionStateButtonTitle}
      />
    );
  };

  const renderStatusFlagBadges = () => {
    const statusFlags = element.statusFlags;
    if (!statusFlags) {
      return null;
    }
    const badges = [];
    // eslint-disable-next-line no-restricted-syntax
    for (let [cssClasses, data] of Object.entries(statusFlags)) {
      cssClasses = `badge status-${cssClasses}`;
      if (typeof data === 'string') {
        data = { text: data };
      }
      if (!data.title) {
        data.title = '';
      }
      badges.push(<span key={cssClasses} className={cssClasses} title={data.title}>{data.text}</span>);
    }
    return badges;
  };

  const title = getBlockTitle(element, type);
  const titleClasses = classNames({
    'element-editor-header__title': true,
    'element-editor-header__title--none': !element.title,
  });
  const expandTitle = i18n._t('ElementHeader.EXPAND', 'Show editable fields');
  const containerClasses = classNames(
    'element-editor-header', {
      'element-editor-header--simple': simple,
    }
  );
  const iconContainerClasses = classNames(
    'element-editor-header__icon-container',
    {
      'element-editor-header__icon-container--broken': type.broken,
    }
  );
  const expandCaretClasses = classNames(
    'element-editor-header__expand',
    {
      'font-icon-right-open-big': !expandable,
      'font-icon-up-open-big': expandable && previewExpanded,
      'font-icon-down-open-big': expandable && !previewExpanded,
    }
  );
  const blockIconId = `element-icon-${element.id}`;
  const dragHandleLabel = i18n._t('ElementHeader.DRAG_HANDLE', 'Reorder block');

  return (
    <div className={containerClasses}>
      <div
        className="element-editor-header__drag-handle"
        ref={sortableActivatorRef}
        {...sortableListeners}
        {...sortableAttributes}
        tabIndex={0}
        role="button"
        aria-label={dragHandleLabel}
        aria-controls={elementId}
      >
        <span className="font-icon-drag-handle" aria-hidden="true" />
      </div>
      <div className="element-editor-header__info">
        <div className={iconContainerClasses}>
          <span className={type.icon} id={blockIconId} aria-hidden="true" />
          {renderVersionedStateMessage()}
          {!type.broken && !simple && <Tooltip
            placement="top"
            isOpen={tooltipOpen && !disableTooltip}
            target={blockIconId}
            toggle={toggle}
          >
            {type.title}
          </Tooltip>}
        </div>
        <h3 className={titleClasses}>{title}</h3>
        {renderStatusFlagBadges()}
      </div>
      {!simple && <div className="element-editor-header__actions">
        {/* The onPointerDown handler on this div prevents thigs like <input> fields from starting element drag and drop sorting */}
        <div role="none" onClick={(event) => event.stopPropagation()} onPointerDown={(evt) => evt.stopPropagation()}>
          <ElementActionsComponent
            element={element}
            type={type}
            areaId={areaId}
            activeTab={activeTab}
            editTabs={type.editTabs}
            handleEditTabsClick={handleEditTabsClick}
            expandable={expandable}
          />
        </div>
        {!type.broken && <span className={expandCaretClasses} aria-label={expandTitle} title={expandTitle} />}
      </div>}
    </div>
  );
};

Header.propTypes = {
  element: elementType.isRequired,
  type: elementTypeType.isRequired,
  areaId: PropTypes.number,
  activeTab: PropTypes.string,
  simple: PropTypes.bool,
  ElementActionsComponent: PropTypes.elementType,
  previewExpanded: PropTypes.bool,
  disableTooltip: PropTypes.bool,
  sortableListeners: PropTypes.object,
  sortableAttributes: PropTypes.object,
  sortableActivatorRef: PropTypes.func,
  elementId: PropTypes.string,
  expandable: PropTypes.bool,
  handleEditTabsClick: PropTypes.func,
};

export { Header as Component };

export default compose(
  inject(
    ['ElementActions'],
    (ElementActionsComponent) => ({
      ElementActionsComponent,
    }),
    () => 'ElementEditor.ElementList.Element'
  )
)(Header);
