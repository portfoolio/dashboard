import { createStore, applyMiddleware, compose, ReducersMapObject } from 'redux';
import { combineEpics, createEpicMiddleware } from 'redux-observable';
import { throttle, camelCase } from 'lodash';
import storage from 'Core/util/storage';
import { combineReducers } from 'redux';
import Service from 'Core/util/Service';

let reducers: ReducersMapObject<any, any> = {};
let epics: any = [];

const reducerContext = require.context('../', true, /Store\/reducer\.ts$/);
const epicContext = require.context('../', true, /Store\/epic\.ts$/);
reducerContext.keys().map((key: string) => {
  let moduleName = (key.substring(key.lastIndexOf('./') + 2, key.lastIndexOf('/Store')))
    .toLowerCase()
    .replace('src', '');

  reducers[camelCase(moduleName)] = reducerContext(key).default;
  return key;
});

epicContext.keys().map((key: string) => {
  Object.keys(epicContext(key).default).map(k => epics.push(epicContext(key).default[k]));
  return key;
});

const predefinedState = storage.loadState();
const composeEnhancers = compose;

const epicMiddleware = createEpicMiddleware({
  dependencies: { Service },
});

const store: any = createStore(
  combineReducers({ ...reducers }),
  predefinedState,
  composeEnhancers(applyMiddleware(epicMiddleware)),
);

store.subscribe(throttle(() => {
  const { auth } = store.getState();
  storage.saveState({
    auth,
  });
}, 1000));

epicMiddleware.run(combineEpics.apply({}, epics));

export default store;
