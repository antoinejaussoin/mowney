import React, { Component } from 'react';
import flow from 'lodash/flow';
import { connect } from 'react-redux';
import translate from '../i18n/Translate';

const stateToProps = state => ({
    state
});

const actionsToProps = dispatch => ({
    dispatch
});

class Main extends Component {
    render() {
        return (
            <p>Hello you</p>
        );
    }
}

const decorators = flow([
    connect(stateToProps, actionsToProps),
    translate('Main')
]);

export default decorators(Main);
