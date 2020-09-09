import { map, mergeMap } from 'rxjs/operators';
import { ActionsObservable, ofType, StateObservable } from 'redux-observable';
import { concat, from, of } from 'rxjs';
import { ServiceInterface } from 'util/Service';
import { ActionType } from './types';
import {
  fetchHeaderFullFilled,
  fetchBlogFullFilled,
  fetchBlogs,
  fetchBlogsFullFilled,
  redirectAfterCreation,
} from './actions';
import { Blog, BlogHeader } from 'common/api';
import { showNotification } from 'modules/Core/Store/actions';

const fetchBlogsEpic = (
  action$: ActionsObservable<any>,
  state$: StateObservable<any>,
  { Service }: { Service: ServiceInterface },
) => {
  return action$.pipe(
    ofType(ActionType.FETCH_BLOGS),
    mergeMap(() => {
      return from(Service.request(Blog.list)).pipe(
        mergeMap((response: any) => {
            return concat(
              of(redirectAfterCreation(false)),
              of(fetchBlogsFullFilled(response)),
            );
          },
        ),
      );
    }),
  );
};

const createBlogEpic = (
  action$: ActionsObservable<any>,
  state$: StateObservable<any>,
  { Service }: { Service: ServiceInterface },
) => {
  return action$.pipe(
    ofType(ActionType.CREATE_BLOG),
    mergeMap(({ data }: { data: object }) => {
      return from(Service.request(Blog.create, {}, data)).pipe(
        mergeMap(() => {
          return concat(
            of(redirectAfterCreation(true)),
            of(showNotification('Blog successfully created.')),
          );
        }),
      );
    }),
  );
};

const removeBlogEpic = (
  action$: ActionsObservable<any>,
  state$: StateObservable<any>,
  { Service }: { Service: ServiceInterface },
) => {
  return action$.pipe(
    ofType(ActionType.REMOVE_BLOG),
    mergeMap(({ id }: any) => {
      return from(Service.request(Blog.delete, { id })).pipe(
        mergeMap(() => {
          return concat(
            of(fetchBlogs()),
            of(showNotification('Blog successfully removed.')),
          );
        }),
      );
    }),
  );
};

const updateBlogEpic = (
  action$: ActionsObservable<any>,
  state$: StateObservable<any>,
  { Service }: { Service: ServiceInterface },
) => {
  return action$.pipe(
    ofType(ActionType.UPDATE_BLOG),
    mergeMap(({ data }: { data: object }) => {
      return from(Service.request(Blog.update, {}, data)).pipe(
        mergeMap(() => {
          return concat(
            of(redirectAfterCreation(true)),
            of(fetchBlogs()),
            of(showNotification('Blog successfully updated.')),
          );
        }),
      );
    }),
  );
};

const fetchBlogEpic = (
  action$: ActionsObservable<any>,
  state$: StateObservable<any>,
  { Service }: { Service: ServiceInterface },
) => {
  return action$.pipe(
    ofType(ActionType.FETCH_BLOG),
    mergeMap(({ id }: any) => {
      return from(Service.request(Blog.find, { id })).pipe(
        map((response: any) => fetchBlogFullFilled(response)),
      );
    }),
  );
};

const fetchBlogHeaderEpic = (
  action$: ActionsObservable<any>,
  state$: StateObservable<any>,
  { Service }: { Service: ServiceInterface },
) => {
  return action$.pipe(
    ofType(ActionType.FETCH_BLOG_HEADER),
    mergeMap(() => {
      return from(Service.request(BlogHeader.find)).pipe(
        map((response: any) => fetchHeaderFullFilled(response)),
      );
    }),
  );
};

const updateBlogHeaderEpic = (
  action$: ActionsObservable<any>,
  state$: StateObservable<any>,
  { Service }: { Service: ServiceInterface },
) => {
  return action$.pipe(
    ofType(ActionType.UPDATE_BLOG_HEADER),
    mergeMap(({ data }: { data: object }) => {
      return from(Service.request(BlogHeader.update, {}, data)).pipe(
        mergeMap(() => {
          return concat(
            of(redirectAfterCreation(true)),
            of(fetchBlogs()),
            of(showNotification('Header successfully updated.')),
          );
        }),
      );
    }),
  );
};

export default {
  fetchBlogsEpic,
  createBlogEpic,
  fetchBlogEpic,
  updateBlogEpic,
  removeBlogEpic,
  fetchBlogHeaderEpic,
  updateBlogHeaderEpic,
};
