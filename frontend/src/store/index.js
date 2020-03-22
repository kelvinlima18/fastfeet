import { persistStore } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';

import createStore from './createStore';
import persisteReducers from './persistReducers';

import rootReducer from './modules/rootReducer';
import rootSaga from './modules/rootSaga';

const sagaMonitor =
  process.env.NODE_ENV === 'development'
    ? console.tron.createSagaMonitor()
    : null;
const sagaMIddleware = createSagaMiddleware({ sagaMonitor });

const middlewares = [sagaMIddleware];

const store = createStore(persisteReducers(rootReducer), middlewares);
const persistor = persistStore(store);

sagaMIddleware.run(rootSaga);

export { store, persistor };
