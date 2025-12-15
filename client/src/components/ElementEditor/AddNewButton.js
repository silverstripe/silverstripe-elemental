import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from 'components/Button/Button';
import i18n from 'i18n';
import { elementTypeType } from 'types/elementTypeType';
import { inject } from 'lib/Injector';

const AddNewButton = ({
  AddElementPopoverComponent,
  elementTypes,
  areaId,
}) => {
  const [popoverOpen, setPopoverOpen] = useState(false);

  const toggle = () => {
    setPopoverOpen((prevState) => !prevState);
  };

  /**
   * Render the add button for block types
   * @returns {DOMElement}
   */
  const buttonAttributes = {
    id: `ElementalArea${areaId}_AddButton`,
    color: 'primary',
    onClick: toggle,
    icon: 'plus',
  };

  return (
    <div>
      <Button {...buttonAttributes}>
        {i18n._t('ElementAddNewButton.ADD_NEW_BLOCK', 'Add new block')}
      </Button>
      <AddElementPopoverComponent
        placement="bottom-start"
        target={buttonAttributes.id}
        isOpen={popoverOpen}
        elementTypes={elementTypes}
        toggle={toggle}
        areaId={areaId}
        insertAfterElement={0}
      />
    </div>
  );
};

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
