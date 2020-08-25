import { ActionType } from './types';

export function fetchCounters() {
  return {
    type: ActionType.FETCH_COUNTERS,
  };
}

export function fetchCountersFullFilled(counters: [] = []) {
  return {
    type: ActionType.FETCH_COUNTERS_FULFILLED,
    counters,
  };
}

export function fetchCounterFullFilled(counter: object) {
  return {
    type: ActionType.FETCH_COUNTER_FULFILLED,
    counter,
  };
}

export function fetchCounter(id: string) {
  return {
    type: ActionType.FETCH_COUNTER,
    id,
  };
}

export function createCounter(data: object) {
  return {
    type: ActionType.CREATE_COUNTER,
    data,
  };
}

export function redirectAfterCreation(shouldRedirect: boolean) {
  return {
    type: ActionType.REDIRECT_AFTER_CREATION,
    shouldRedirect,
  };
}

export function updateCounter(data: object) {
  return {
    type: ActionType.UPDATE_COUNTER,
    data,
  };
}

export function removeCounter(id: string) {
  return {
    type: ActionType.REMOVE_COUNTER,
    id,
  };
}
