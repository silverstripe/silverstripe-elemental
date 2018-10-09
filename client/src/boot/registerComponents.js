import Injector from 'lib/Injector';
import Element from 'components/ElementEditor/Element';
import ElementActions from 'components/ElementEditor/ElementActions';
import ElementEditor from 'components/ElementEditor/ElementEditor';
import ElementList from 'components/ElementEditor/ElementList';
import Toolbar from 'components/ElementEditor/Toolbar';
import AddNewButton from 'components/ElementEditor/AddNewButton';
import Header from 'components/ElementEditor/Header';
import Content from 'components/ElementEditor/Content';
import InlineEditForm from 'components/ElementEditor/InlineEditForm';
import AddElementPopover from 'components/ElementEditor/AddElementPopover';
import HoverBar from 'components/ElementEditor/HoverBar';
import DefaultSummary from 'components/ElementSummary/Default';
import ContentSummary from 'components/ElementSummary/Content';

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
    ElementInlineEditForm: InlineEditForm,
    AddElementPopover,
    HoverBar,
    ElementSummaryContent: ContentSummary,
    ElementSummaryDefault: DefaultSummary,
  });
};
