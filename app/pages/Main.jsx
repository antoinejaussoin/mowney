import React from 'react';
import Component from '../Component';
import translate from '../i18n/Translate';
import { connect } from 'react-redux';

const stateToProps = state => ({
    state
});

const actionsToProps = dispatch => ({
    dispatch
});

@connect(stateToProps, actionsToProps)
@translate('Main')
class Main extends Component {
    render() {
        return (
            <div>
                <h1>Hello World</h1>
            </div>
        );
    }
}

export default Main;
