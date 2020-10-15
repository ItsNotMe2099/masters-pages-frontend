import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import reducers from './reducers';
import { rootSaga } from './sagas';

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers =
  typeof window === 'object' &&
  window.['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__']?   
    window.['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__']({
    }) : compose;

export const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(rootSaga);
