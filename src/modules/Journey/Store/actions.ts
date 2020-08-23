import { ActionType } from './types';

export function fetchJourneys() {
  return {
    type: ActionType.FETCH_JOURNEYS,
  };
}

export function fetchJourneysFullFilled(journeys: [] = []) {
  return {
    type: ActionType.FETCH_JOURNEYS_FULFILLED,
    journeys,
  };
}

export function fetchJourneyFullFilled(journey: object) {
  return {
    type: ActionType.FETCH_JOURNEY_FULFILLED,
    journey,
  };
}

export function fetchJourney(id: string) {
  return {
    type: ActionType.FETCH_JOURNEY,
    id,
  };
}

export function createJourney(data: object) {
  return {
    type: ActionType.CREATE_JOURNEY,
    data,
  };
}

export function redirectAfterCreation(shouldRedirect: boolean) {
  return {
    type: ActionType.REDIRECT_AFTER_CREATION,
    shouldRedirect,
  };
}

export function updateJourney(data: object) {
  return {
    type: ActionType.UPDATE_JOURNEY,
    data,
  };
}

export function removeJourney(id: string) {
  return {
    type: ActionType.REMOVE_JOURNEY,
    id,
  };
}

export function fetchHeader() {
  return {
    type: ActionType.FETCH_JOURNEY_HEADER,
  }
}

export function fetchHeaderFullFilled(header: object) {
  return {
    type: ActionType.FETCH_JOURNEY_HEADER_FUL_FILLED,
    header,
  };
}

export function updateHeader(data: object) {
  return {
    type: ActionType.UPDATE_JOURNEY_HEADER,
    data
  }
}

export function fetchJourneyItems(journeyId: string,) {
  return {
    type: ActionType.FETCH_JOURNEY_ITEMS,
    journeyId,
  };
}

export function fetchJourneyItemsFullFilled(journeyItems: [] = []) {
  return {
    type: ActionType.FETCH_JOURNEY_ITEMS_FULFILLED,
    journeyItems,
  };
}

export function fetchJourneyItemFullFilled(journeyItem: object) {
  return {
    type: ActionType.FETCH_JOURNEY_ITEM_FULFILLED,
    journeyItem,
  };
}

export function fetchJourneyItem(id: string) {
  return {
    type: ActionType.FETCH_JOURNEY_ITEM,
    id,
  };
}

export function createJourneyItem(journeyId: string, data: object) {
  return {
    type: ActionType.CREATE_JOURNEY_ITEM,
    journeyId,
    data,
  };
}

export function updateJourneyItem(data: object) {
  return {
    type: ActionType.UPDATE_JOURNEY_ITEM,
    data,
  };
}

export function removeJourneyItem(journeyId: string, id: string) {
  return {
    type: ActionType.REMOVE_JOURNEY_ITEM,
    journeyId,
    id,
  };
}
