import { ActionType } from './types';

const initialState = {
  journeys: [],
  journeyItems: [],
  journeyItem: {
    title: '',
    subtitle: '',
    description: '',
  },
  currentItem: {
    title: '',
    description: '',
    icon: '',
  },
  header: {
    title: '',
    description: '',
  },
  shouldRedirect: false,
};

export default (
  state = initialState,
  action: any,
): object => {
  switch (action.type) {
    case ActionType.FETCH_JOURNEYS:
    case ActionType.FETCH_JOURNEY:
    case ActionType.FETCH_JOURNEY_FULFILLED:
      const journey = action.journey || initialState.currentItem;
      return { ...state, currentItem: journey };

    case ActionType.REMOVE_JOURNEY:
      return { ...state };

    case ActionType.FETCH_JOURNEYS_FULFILLED:
      const journeys = action.journeys || [];
      return { ...state, journeys };

    case ActionType.CREATE_JOURNEY:
      return { ...state };

    case ActionType.REDIRECT_AFTER_CREATION:
      return { ...state, shouldRedirect: action.shouldRedirect };

    case ActionType.FETCH_JOURNEY_HEADER:
    case ActionType.FETCH_JOURNEY_HEADER_FUL_FILLED:
      const header = action.header || initialState.header;
      return { ...state, header };

    case ActionType.FETCH_JOURNEY_ITEMS:
    case ActionType.FETCH_JOURNEY_ITEM:
    case ActionType.FETCH_JOURNEY_ITEM_FULFILLED:
      const journeyItem = action.journeyItem || initialState.journeyItem;
      return { ...state, journeyItem };

    case ActionType.FETCH_JOURNEY_ITEMS_FULFILLED:
      const journeyItems = action.journeyItems || [];
      return { ...state, journeyItems };

    case ActionType.CREATE_JOURNEY_ITEM:
    case ActionType.REMOVE_JOURNEY_ITEM:
      return { ...state };

    default:
      return state;
  }
};
