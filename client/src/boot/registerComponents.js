import Injector from 'lib/Injector';
import readOneBlockQuery from 'state/history/readOneBlockQuery';

export default () => {
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
