/* eslint-disable @typescript-eslint/no-explicit-any */
import { stateProp } from './AppAPI';

export default function (
  state: stateProp,
  action: { type: string; payload?: any }
) {
  if (action.type === 'SWITCH_HEADER_LEFT_BTN') {
    return { ...state, isExtendFuncLeftBar: !state.isExtendFuncLeftBar };
  }

  if (action.type === 'SWITCH_FULL_SCREEN') {
    const switchFullScreenBoolean = !state.isFullScreen;

    if (switchFullScreenBoolean) {
      document.querySelector('header')!.style.display = 'none';
      document.querySelector('aside')!.style.display = 'none';
      document.querySelector('.timeClock')!.style.height = '100vh';
      document.documentElement.requestFullscreen();
    } else {
      document.querySelector('header')!.style.display = 'flex';
      document.querySelector('aside')!.style.display = 'block';
      document.querySelector('.timeClock')!.style.height = 'auto';
      document.exitFullscreen();
    }

    return { ...state, isFullScreen: switchFullScreenBoolean };
  }

  if (action.type === 'CLOSE_FULL_SCREEN') {
    document.querySelector('header')!.style.display = 'flex';
    document.querySelector('aside')!.style.display = 'block';
    document.querySelector('.timeClock')!.style.height = 'auto';
    document.exitFullscreen();

    return { ...state, isFullScreen: false };
  }
  return state;
}
