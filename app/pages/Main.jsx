import React, { Component, PropTypes } from 'react';
import flow from 'lodash/flow';
import { connect } from 'react-redux';
import translate from '../i18n/Translate';
import { getSummary } from '../selectors/dashboard';

const stateToProps = state => ({
    summary: getSummary(state)
});

const actionsToProps = dispatch => ({
    dispatch
});

class Main extends Component {
    render() {
        const lines = this.props.summary.lines;
        return (
            <div>
                <p>Hello you</p>
                <div>
                    { lines.map(line => <p>{ line.name }</p>) }
                </div>
            </div>
        );
    }
}

Main.propTypes = {
    summary: PropTypes.object
};

const decorators = flow([
    connect(stateToProps, actionsToProps),
    translate('Main')
]);

export default decorators(Main);
