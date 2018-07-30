import Injector from 'lib/Injector';
import Element from 'components/ElementEditor/Element';
import ElementEditor from 'components/ElementEditor/ElementEditor';
import ElementList from 'components/ElementEditor/ElementList';
import Toolbar from 'components/ElementEditor/Toolbar';

export default () => {
  Injector.component.registerMany({
    ElementEditor,
    ElementToolbar: Toolbar,
    ElementList,
    Element,
  });
};
