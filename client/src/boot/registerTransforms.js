import Injector from 'lib/Injector';
import HistoricElementViewFactory from 'components/HistoricElementView/HistoricElementView';
import revertToBlockVersionRequest from 'state/history/revertToBlockVersionRequest';
import ArchiveAction from 'components/ElementActions/ArchiveAction';
import DuplicateAction from 'components/ElementActions/DuplicateAction';
import SaveAction from 'components/ElementActions/SaveAction';
import PublishAction from 'components/ElementActions/PublishAction';
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
    'blocks-history-revert',
    (updater) => {
      // Add revertToVersion() to props.actions on HistoryViewerToolbar
      updater.component(
        'HistoryViewerToolbar.VersionedAdmin.HistoryViewer.Element.HistoryViewerVersionDetail',
        revertToBlockVersionRequest,
        'BlockRevertRequest'
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
