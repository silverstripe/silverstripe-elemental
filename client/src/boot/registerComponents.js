import Injector from 'lib/Injector';
import ElementEditor from 'components/ElementEditor/containers/ElementEditor';

export default () => {
  Injector.component.registerMany({
    ElementEditor
  });
};
