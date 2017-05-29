/* global __DEVELOPMENT__ __DEVTOOLS__ */
/* eslint global-require: 0 */

import { compose, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';
import DevTools from 'components/DevTools';
import reducers from 'modules/state';
import sagas from 'modules/sagas';

export default function configureStore(initialState = {}, browserHistory) {
    const middlewares = [];
    const sagaMiddleware = createSagaMiddleware();
    middlewares.push(thunk);
    middlewares.push(routerMiddleware(browserHistory));
    middlewares.push(sagaMiddleware);

    if (__DEVELOPMENT__) {
        const { createLogger } = require('redux-logger');

        const logger = createLogger({ predicate:
            (getState, action) => action.type !== 'EFFECT_TRIGGERED' &&
                                  action.type !== 'EFFECT_RESOLVED' });
        middlewares.push(logger);
    }

    let createStoreWithMiddleware = applyMiddleware(...middlewares);

    if (__DEVTOOLS__) {
        createStoreWithMiddleware = compose(
            createStoreWithMiddleware,
            DevTools.instrument()
        );
    }

    const finalCreateStore = createStoreWithMiddleware(createStore);
    const store = finalCreateStore(reducers, initialState);
    sagaMiddleware.run(sagas);

    if (__DEVELOPMENT__) {
        if (module.hot) {
            // Enable Webpack hot module replacement for reducers
            module.hot.accept('../modules/state', () => {
                const nextReducer = require('../modules/state');

                store.replaceReducer(nextReducer);
            });
        }
    }

    return store;
}
