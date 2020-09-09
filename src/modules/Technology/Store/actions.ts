import { ActionType } from './types';

export function fetchTechnologies() {
  return {
    type: ActionType.FETCH_TECHNOLOGIES,
  };
}

export function fetchTechnologiesFullFilled(technologies: [] = []) {
  return {
    type: ActionType.FETCH_TECHNOLOGIES_FULFILLED,
    technologies,
  };
}

export function fetchTechnologyFullFilled(technology: object) {
  return {
    type: ActionType.FETCH_TECHNOLOGY_FULFILLED,
    technology,
  };
}

export function fetchTechnology(id: string) {
  return {
    type: ActionType.FETCH_TECHNOLOGY,
    id,
  };
}

export function createTechnology(data: object) {
  return {
    type: ActionType.CREATE_TECHNOLOGY,
    data,
  };
}

export function redirectAfterCreation(shouldRedirect: boolean) {
  return {
    type: ActionType.REDIRECT_AFTER_CREATION,
    shouldRedirect,
  };
}

export function updateTechnology(data: object) {
  return {
    type: ActionType.UPDATE_TECHNOLOGY,
    data,
  };
}

export function removeTechnology(id: string) {
  return {
    type: ActionType.REMOVE_TECHNOLOGY,
    id,
  };
}

export function fetchHeader() {
  return {
    type: ActionType.FETCH_TECHNOLOGY_HEADER,
  }
}

export function fetchHeaderFullFilled(header: object) {
  return {
    type: ActionType.FETCH_TECHNOLOGY_HEADER_FUL_FILLED,
    header,
  };
}

export function updateHeader(data: object) {
  return {
    type: ActionType.UPDATE_TECHNOLOGY_HEADER,
    data
  }
}
