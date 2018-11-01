import Injector from 'lib/Injector';
import Element from 'components/ElementEditor/Element';
import ElementActions from 'components/ElementEditor/ElementActions';
import ElementEditor from 'components/ElementEditor/ElementEditor';
import ElementList from 'components/ElementEditor/ElementList';
import Toolbar from 'components/ElementEditor/Toolbar';
import AddNewButton from 'components/ElementEditor/AddNewButton';
import Header from 'components/ElementEditor/Header';
import Content from 'components/ElementEditor/Content';
import Summary from 'components/ElementEditor/Summary';
import InlineEditForm from 'components/ElementEditor/InlineEditForm';
import AddElementPopover from 'components/ElementEditor/AddElementPopover';
import HoverBar from 'components/ElementEditor/HoverBar';
import DragPositionIndicator from 'components/ElementEditor/DragPositionIndicator';
import TextCheckboxGroupField from 'components/TextCheckboxGroupField/TextCheckboxGroupField';

export default () => {
  Injector.component.registerMany({
    ElementEditor,
    ElementToolbar: Toolbar,
    ElementAddNewButton: AddNewButton,
    ElementList,
    Element,
    ElementActions,
    ElementHeader: Header,
    ElementContent: Content,
    ElementSummary: Summary,
    ElementInlineEditForm: InlineEditForm,
    AddElementPopover,
    HoverBar,
    DragPositionIndicator,
    TextCheckboxGroupField,
  });
};
