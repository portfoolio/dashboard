import { ActionType } from './types';

export function fetchProjects() {
  return {
    type: ActionType.FETCH_PROJECTS,
  };
}

export function fetchProjectsFullFilled(projects: [] = []) {
  return {
    type: ActionType.FETCH_PROJECTS_FULFILLED,
    projects,
  };
}

export function fetchProjectFullFilled(project: object) {
  return {
    type: ActionType.FETCH_PROJECT_FULFILLED,
    project,
  };
}

export function fetchProject(id: string) {
  return {
    type: ActionType.FETCH_PROJECT,
    id,
  };
}

export function createProject(data: object) {
  return {
    type: ActionType.CREATE_PROJECT,
    data,
  };
}

export function redirectAfterCreation(shouldRedirect: boolean) {
  return {
    type: ActionType.REDIRECT_AFTER_CREATION,
    shouldRedirect,
  };
}

export function updateProject(data: object) {
  return {
    type: ActionType.UPDATE_PROJECT,
    data,
  };
}

export function removeProject(id: string) {
  return {
    type: ActionType.REMOVE_PROJECT,
    id,
  };
}

export function fetchHeader() {
  return {
    type: ActionType.FETCH_PROJECT_HEADER,
  }
}

export function fetchHeaderFullFilled(header: object) {
  return {
    type: ActionType.FETCH_PROJECT_HEADER_FUL_FILLED,
    header,
  };
}

export function updateHeader(data: object) {
  return {
    type: ActionType.UPDATE_PROJECT_HEADER,
    data
  }
}
