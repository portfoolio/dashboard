import { map, mergeMap } from 'rxjs/operators';
import { ActionsObservable, ofType, StateObservable } from 'redux-observable';
import { concat, from, of } from 'rxjs';
import { ServiceInterface } from 'util/Service';
import { ActionType } from './types';
import {
  fetchHeaderFullFilled,
  fetchTestimonialFullFilled,
  fetchTestimonials,
  fetchTestimonialsFullFilled,
  redirectAfterCreation,
} from './actions';
import { Testimonial, TestimonialHeader } from 'common/api';
import { showNotification } from 'modules/Core/Store/actions';

const fetchTestimonialsEpic = (
  action$: ActionsObservable<any>,
  state$: StateObservable<any>,
  { Service }: { Service: ServiceInterface },
) => {
  return action$.pipe(
    ofType(ActionType.FETCH_TESTIMONIALS),
    mergeMap(() => {
      return from(Service.request(Testimonial.list)).pipe(
        mergeMap((response: any) => {
            return concat(
              of(redirectAfterCreation(false)),
              of(fetchTestimonialsFullFilled(response)),
            );
          },
        ),
      );
    }),
  );
};

const createTestimonialEpic = (
  action$: ActionsObservable<any>,
  state$: StateObservable<any>,
  { Service }: { Service: ServiceInterface },
) => {
  return action$.pipe(
    ofType(ActionType.CREATE_TESTIMONIAL),
    mergeMap(({ data }: { data: object }) => {
      return from(Service.request(Testimonial.create, {}, data)).pipe(
        mergeMap(() => {
          return concat(
            of(redirectAfterCreation(true)),
            of(showNotification('Testimonial successfully created.')),
          );
        }),
      );
    }),
  );
};

const removeTestimonialEpic = (
  action$: ActionsObservable<any>,
  state$: StateObservable<any>,
  { Service }: { Service: ServiceInterface },
) => {
  return action$.pipe(
    ofType(ActionType.REMOVE_TESTIMONIAL),
    mergeMap(({ id }: any) => {
      return from(Service.request(Testimonial.delete, { id })).pipe(
        mergeMap(() => {
          return concat(
            of(fetchTestimonials()),
            of(showNotification('Testimonial successfully removed.')),
          );
        }),
      );
    }),
  );
};

const updateTestimonialEpic = (
  action$: ActionsObservable<any>,
  state$: StateObservable<any>,
  { Service }: { Service: ServiceInterface },
) => {
  return action$.pipe(
    ofType(ActionType.UPDATE_TESTIMONIAL),
    mergeMap(({ data }: { data: object }) => {
      return from(Service.request(Testimonial.update, {}, data)).pipe(
        mergeMap(() => {
          return concat(
            of(redirectAfterCreation(true)),
            of(fetchTestimonials()),
            of(showNotification('Testimonial successfully updated.')),
          );
        }),
      );
    }),
  );
};

const fetchTestimonialEpic = (
  action$: ActionsObservable<any>,
  state$: StateObservable<any>,
  { Service }: { Service: ServiceInterface },
) => {
  return action$.pipe(
    ofType(ActionType.FETCH_TESTIMONIAL),
    mergeMap(({ id }: any) => {
      return from(Service.request(Testimonial.find, { id })).pipe(
        map((response: any) => fetchTestimonialFullFilled(response)),
      );
    }),
  );
};

const fetchTestimonialHeaderEpic = (
  action$: ActionsObservable<any>,
  state$: StateObservable<any>,
  { Service }: { Service: ServiceInterface },
) => {
  return action$.pipe(
    ofType(ActionType.FETCH_TESTIMONIAL_HEADER),
    mergeMap(() => {
      return from(Service.request(TestimonialHeader.find)).pipe(
        map((response: any) => fetchHeaderFullFilled(response)),
      );
    }),
  );
};

const updateTestimonialHeaderEpic = (
  action$: ActionsObservable<any>,
  state$: StateObservable<any>,
  { Service }: { Service: ServiceInterface },
) => {
  return action$.pipe(
    ofType(ActionType.UPDATE_TESTIMONIAL_HEADER),
    mergeMap(({ data }: { data: object }) => {
      return from(Service.request(TestimonialHeader.update, {}, data)).pipe(
        mergeMap(() => {
          return concat(
            of(redirectAfterCreation(true)),
            of(fetchTestimonials()),
            of(showNotification('Header successfully updated.')),
          );
        }),
      );
    }),
  );
};

export default {
  fetchTestimonialsEpic,
  createTestimonialEpic,
  fetchTestimonialEpic,
  updateTestimonialEpic,
  removeTestimonialEpic,
  fetchTestimonialHeaderEpic,
  updateTestimonialHeaderEpic,
};
