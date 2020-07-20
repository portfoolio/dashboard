import { GlobalState } from 'modules/Core/types';

export default {
  loadState: (): GlobalState | undefined => {
    const serializedState = localStorage.getItem('state');
    return serializedState ? JSON.parse(serializedState) : undefined;
  },
  saveState: (state: GlobalState): void => localStorage.setItem('state', JSON.stringify(state)),
};
