import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { combineEpics, createEpicMiddleware } from 'redux-observable';
import { throttle, camelCase } from 'lodash';
import Service from 'util/Service';
import storage from 'util/storage';

let reducers: any = {};
let epics: any = [];

const reducerContext = require.context('./modules', true, /Store\/reducer\.ts$/);
const epicContext = require.context('./modules', true, /Store\/epic\.ts$/);
reducerContext.keys().map((key: string) => {
  let moduleName = (key.substring(key.lastIndexOf('./') + 2, key.lastIndexOf('/Store'))).toLowerCase()

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
