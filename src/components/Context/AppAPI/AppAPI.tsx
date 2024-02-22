/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useReducer } from 'react';
import reducer from './reducer';

export type stateProp = {
  isExtendFuncLeftBar: boolean;
  isFullScreen: boolean;
  todoClassId: string;
  mainColor: string;
  switchHeaderLeftBtn?: () => void;
  handleScreenSwitch?: () => void;
  handleColorChange?: (arg1: string) => void;
  handleScreenClose?: () => void;
  deleteTodoClass?: (arg1: string) => void;
};

const initialState = {
  isExtendFuncLeftBar: true,
  isFullScreen: false,
  todoClassId: '',
  mainColor: '',
};
const AppContext = createContext<stateProp>(initialState);

function AppAPI({ children }) {
  const [state, dispatch] = useReducer(reducer, { ...initialState });

  const switchHeaderLeftBtn = () =>
    dispatch({ type: 'SWITCH_HEADER_LEFT_BTN' });

  const handleScreenSwitch = () => {
    dispatch({ type: 'SWITCH_FULL_SCREEN' });
  };
  const handleScreenClose = () => {
    dispatch({ type: 'CLOSE_FULL_SCREEN' });
  };

  const handleColorChange = (colorObj: any) => {
    Object.entries(colorObj).forEach(([property, color]) => {
      document.querySelector('body')!.style.setProperty(property, color);
    });
    dispatch({ type: 'MAIN_COLOR_CHANGE', payload: colorObj['--main-color'] });
  };

  const deleteTodoClass = (id: string) => {
    dispatch({ type: 'DELETE_TODO_CLASS', payload: id });
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        switchHeaderLeftBtn,
        handleScreenSwitch,
        handleScreenClose,
        handleColorChange,
        deleteTodoClass,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export { AppContext };
export default AppAPI;
