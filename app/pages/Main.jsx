import React, { Component } from 'react';
import { connect } from 'react-redux';
import translate from '../i18n/Translate';


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
            <p>Hello</p>
        );
    }
}

export default Main;
