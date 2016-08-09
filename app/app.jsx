/* global __DEVTOOLS__ __USE_GA__ __GA_ID__ */
/* eslint global-require:0 */
import React from 'react';
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';
import { Router, IndexRoute, Route, browserHistory } from 'react-router';
import {
    App,
    Main
} from './pages';
import configureStore from './store/configureStore';

const store = configureStore({}, browserHistory);
const history = syncHistoryWithStore(browserHistory, store);

class Index extends React.Component {
    renderRoutes() {
        return (
            <Router history={history}>
                <Route path="/" component={App}>
                    <IndexRoute component={Main} />
                </Route>
            </Router>
        );
    }

    render() {
        let component;
        if (__DEVTOOLS__) {
            const DevTools = require('./components/DevTools').default;

            component = (
                <div>
                    <Provider store={store}>
                        <div>
                            {this.renderRoutes()}
                            <DevTools />
                        </div>
                    </Provider>
                </div>
            );
        } else {
            component = (
                <div>
                    <Provider store={store}>
                        {this.renderRoutes()}
                    </Provider>
                </div>
            );
        }

        return component;
    }
}

export default Index;
