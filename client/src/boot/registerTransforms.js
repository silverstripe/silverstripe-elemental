import Injector from 'lib/Injector';
import readOneBlockQuery from '../state/history/readOneBlockQuery';
import HistoricElementViewFactory from '../components/HistoricElementView/HistoricElementView';

export default () => {
  Injector.transform(
    'elemental-fieldgroup',
    (updater) => {
      updater.component(
        'FieldGroup.HistoryViewer.VersionDetail.HistoricElementView',
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
};
