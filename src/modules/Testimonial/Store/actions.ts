import { ActionType } from './types';

export function fetchTestimonials() {
  return {
    type: ActionType.FETCH_TESTIMONIALS,
  };
}

export function fetchTestimonialsFullFilled(testimonials: [] = []) {
  return {
    type: ActionType.FETCH_TESTIMONIALS_FULFILLED,
    testimonials,
  };
}

export function fetchTestimonialFullFilled(testimonial: object) {
  return {
    type: ActionType.FETCH_TESTIMONIAL_FULFILLED,
    testimonial,
  };
}

export function fetchTestimonial(id: string) {
  return {
    type: ActionType.FETCH_TESTIMONIAL,
    id,
  };
}

export function createTestimonial(data: object) {
  return {
    type: ActionType.CREATE_TESTIMONIAL,
    data,
  };
}

export function redirectAfterCreation(shouldRedirect: boolean) {
  return {
    type: ActionType.REDIRECT_AFTER_CREATION,
    shouldRedirect,
  };
}

export function updateTestimonial(data: object) {
  return {
    type: ActionType.UPDATE_TESTIMONIAL,
    data,
  };
}

export function removeTestimonial(id: string) {
  return {
    type: ActionType.REMOVE_TESTIMONIAL,
    id,
  };
}

export function fetchHeader() {
  return {
    type: ActionType.FETCH_TESTIMONIAL_HEADER,
  }
}

export function fetchHeaderFullFilled(header: object) {
  return {
    type: ActionType.FETCH_TESTIMONIAL_HEADER_FUL_FILLED,
    header,
  };
}

export function updateHeader(data: object) {
  return {
    type: ActionType.UPDATE_TESTIMONIAL_HEADER,
    data
  }
}
