import { createStore, applyMiddleware, compose } from 'redux';
import {MakeStore, createWrapper, Context, HYDRATE} from 'next-redux-wrapper';
import createSagaMiddleware from 'redux-saga';
import reducers from './reducers';
import { rootSaga } from './sagas';
import {IRootState} from "./types";

const sagaMiddleware = createSagaMiddleware();


export const reducer = (state, action) => {
  if (action.type === HYDRATE) {
    return {
      ...state, // use previous state
      ...action.payload // apply delta from hydration
    };
  }

  return reducers(state, action);
};

const composeEnhancers =
  typeof window === 'object' &&
  window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__']?
    window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__']({
    }) : compose;

export const makeStore: MakeStore<IRootState> = (context: Context) => {
  const store = createStore(
    reducer,
    composeEnhancers(applyMiddleware(sagaMiddleware))
  );
  sagaMiddleware.run(rootSaga);

  if (module.hot) {
    module.hot.accept('./reducers', () => {
      console.log('Replacing reducer');
      store.replaceReducer(require('./reducers').default);
    });
  }

  return store;
};

export const wrapper = createWrapper<IRootState>(makeStore, {debug: true});
