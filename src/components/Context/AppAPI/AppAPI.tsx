import { ReactNode, createContext, useReducer } from 'react';
import reducer from './reducer';

export type stateProp = {
  isExtendFuncLeftBar: boolean;
  isFullScreen: boolean;
  switchHeaderLeftBtn?: () => void;
  handleScreenSwitch?: () => void;
  handleScreenClose?: () => void;
};

const initialState = {
  isExtendFuncLeftBar: true,
  isFullScreen: false,
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

  return (
    <AppContext.Provider
      value={{
        ...state,
        switchHeaderLeftBtn,
        handleScreenSwitch,
        handleScreenClose,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export { AppContext };
export default AppAPI;
