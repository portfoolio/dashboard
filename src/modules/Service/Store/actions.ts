import { ActionType } from './types';

export function fetchServices() {
  return {
    type: ActionType.FETCH_SERVICES,
  };
}

export function fetchServicesFullFilled(services: [] = []) {
  return {
    type: ActionType.FETCH_SERVICES_FULFILLED,
    services,
  };
}

export function fetchServiceFullFilled(service: object) {
  return {
    type: ActionType.FETCH_SERVICE_FULFILLED,
    service,
  };
}

export function fetchService(id: string) {
  return {
    type: ActionType.FETCH_SERVICE,
    id,
  };
}

export function createService(data: object) {
  return {
    type: ActionType.CREATE_SERVICE,
    data,
  };
}

export function redirectAfterCreation(shouldRedirect: boolean) {
  return {
    type: ActionType.REDIRECT_AFTER_CREATION,
    shouldRedirect,
  };
}

export function updateService(data: object) {
  return {
    type: ActionType.UPDATE_SERVICE,
    data,
  };
}

export function removeService(id: string) {
  return {
    type: ActionType.REMOVE_SERVICE,
    id,
  };
}

export function fetchHeader() {
  return {
    type: ActionType.FETCH_SERVICE_HEADER,
  }
}

export function fetchHeaderFullFilled(header: object) {
  return {
    type: ActionType.FETCH_SERVICE_HEADER_FUL_FILLED,
    header,
  };
}

export function updateHeader(data: object) {
  return {
    type: ActionType.UPDATE_SERVICE_HEADER,
    data
  }
}
