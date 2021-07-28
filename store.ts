import { createStore, applyMiddleware, compose } from 'redux';
import {MakeStore, createWrapper, Context, HYDRATE} from 'next-redux-wrapper';
import createSagaMiddleware from 'redux-saga';
import reducers from './reducers';
import { rootSaga } from './sagas';
import {IRootState} from "./types";

const sagaMiddleware = createSagaMiddleware();


export const reducer = (state, action) => {
  if (action.type === HYDRATE && !state.hydrated) {
    return {

      ...state, // use previous state
      ...(action.payload.profile ? {profile: action.payload.profile} : {})

    };
  }
  return reducers(state, action);
};


export const makeStore: MakeStore<IRootState> = (context: Context) => {
  const store = createStore(
    reducer,
    compose(applyMiddleware(sagaMiddleware))
  );
  sagaMiddleware.run(rootSaga);

  if (module.hot) {
    module.hot.accept('./reducers', () => {
      store.replaceReducer(require('./reducers').default);
    });
  }

  return store;
};

export const wrapper = createWrapper<IRootState>(makeStore, {debug: false});
