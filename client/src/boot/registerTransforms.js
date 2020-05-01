import Injector from 'lib/Injector';
import readOneBlockQuery from 'state/history/readOneBlockQuery';
import HistoricElementViewFactory from 'components/HistoricElementView/HistoricElementView';
import revertToBlockVersionMutation from 'state/history/revertToBlockVersionMutation';
import readBlocksForAreaQuery from 'state/editor/readBlocksForAreaQuery';
import addElementToArea from 'state/editor/addElementMutation';
import ArchiveAction from 'components/ElementActions/ArchiveAction';
import DuplicateAction from 'components/ElementActions/DuplicateAction';
import PublishAction from 'components/ElementActions/PublishAction';
import SaveAction from 'components/ElementActions/SaveAction';
import UnpublishAction from 'components/ElementActions/UnpublishAction';

export default () => {
  Injector.transform(
    'elemental-fieldgroup',
    (updater) => {
      updater.component(
        'FieldGroup.HistoryViewer.VersionDetail',
        HistoricElementViewFactory,
        'HistoricElement'
      );
    },
    {
      after: 'field-holders'
    }
  );

  Injector.transform(
    'elements-history',
    (updater) => {
      // Add content block history to the HistoryViewer
      updater.component(
        'HistoryViewer.Form_ItemEditForm',
        readOneBlockQuery,
        'ElementHistoryViewer'
      );
    }
  );

  Injector.transform(
    'blocks-history-revert',
    (updater) => {
      // Add block element revert GraphQL mutation to the HistoryViewerToolbar
      updater.component(
        'HistoryViewerToolbar.VersionedAdmin.HistoryViewer.Element.HistoryViewerVersionDetail',
        revertToBlockVersionMutation,
        'BlockRevertMutation'
      );
    }
  );

  Injector.transform(
    'cms-element-editor',
    (updater) => {
      // Add GraphQL query for reading elements on a page for the ElementEditor
      updater.component(
        'ElementList',
        readBlocksForAreaQuery,
        'PageElements'
      );
    }
  );

  Injector.transform(
    'cms-element-adder',
    (updater) => {
      // Add GraphQL query for adding elements to an ElementEditor (ElementalArea)
      updater.component(
        'AddElementPopover',
        addElementToArea,
        'ElementAddButton'
      );
    }
  );

  // Add elemental editor actions
  Injector.transform('element-actions', (updater) => {
    updater.component('ElementActions', SaveAction, 'ElementActionsWithSave');
    updater.component('ElementActions', PublishAction, 'ElementActionsWithPublish');
    updater.component('ElementActions', UnpublishAction, 'ElementActionsWithUnpublish');
    updater.component('ElementActions', DuplicateAction, 'ElementActionsWithDuplicate');
    updater.component('ElementActions', ArchiveAction, 'ElementActionsWithArchive');
  });
};
