import ga from 'react-ga';

export const googleAnalyticsMiddleware = (/* store */) => next => action => {
    const result = next(action);

    // Each of these actions will be recorded with Google Analytics
    const actions = [];

    if (actions.indexOf(action.type) > -1) {
        ga.event({ category: 'Action', action: action.type });
    }

    if (action.type === '@@router/LOCATION_CHANGE') {
        ga.pageview(action.payload.pathname);
    }

    return result;
};
