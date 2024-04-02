import Injector from 'lib/Injector';
import ElementReducer from 'state/reducer/ElementReducer';

export default () => {
  Injector.reducer.registerMany({
    elemental: ElementReducer,
  });
};
