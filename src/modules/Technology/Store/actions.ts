import { ActionType } from './types';

export function fetchTechnologies() {
  return {
    type: ActionType.FETCH_TECHNOLOGIESS,
  };
}

export function fetchTechnologiesFullFilled(technologies: [] = []) {
  return {
    type: ActionType.FETCH_TECHNOLOGIESS_FULFILLED,
    technologies,
  };
}

export function fetchTechnologieFullFilled(technologie: object) {
  return {
    type: ActionType.FETCH_TECHNOLOGIES_FULFILLED,
    technologie,
  };
}

export function fetchTechnologie(id: string) {
  return {
    type: ActionType.FETCH_TECHNOLOGIES,
    id,
  };
}

export function createTechnologie(data: object) {
  return {
    type: ActionType.CREATE_TECHNOLOGIES,
    data,
  };
}

export function redirectAfterCreation(shouldRedirect: boolean) {
  return {
    type: ActionType.REDIRECT_AFTER_CREATION,
    shouldRedirect,
  };
}

export function updateTechnologie(data: object) {
  return {
    type: ActionType.UPDATE_TECHNOLOGIES,
    data,
  };
}

export function removeTechnologie(id: string) {
  return {
    type: ActionType.REMOVE_TECHNOLOGIES,
    id,
  };
}

export function fetchHeader() {
  return {
    type: ActionType.FETCH_TECHNOLOGIES_HEADER,
  }
}

export function fetchHeaderFullFilled(header: object) {
  return {
    type: ActionType.FETCH_TECHNOLOGIES_HEADER_FUL_FILLED,
    header,
  };
}

export function updateHeader(data: object) {
  return {
    type: ActionType.UPDATE_TECHNOLOGIES_HEADER,
    data
  }
}
