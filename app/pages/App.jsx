import React, { PropTypes } from 'react';
import Component from '../Component';
import { connect } from 'react-redux';
import TranslationProvider from '../i18n/TranslationProvider';

const stateToProps = state => ({ state });

const actionsToProps = dispatch => ({ dispatch });

@connect(stateToProps, actionsToProps)
class App extends Component {
    componentDidMount() {

    }

    render() {
        return (
            <TranslationProvider>
                { this.props.children }
            </TranslationProvider>
        );
    }
}

App.propTypes = {
    children: PropTypes.object
};

App.defaultTypes = {
    children: null
};

export default App;
