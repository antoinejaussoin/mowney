import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { Layout, Panel } from 'react-toolbox/lib/layout';
import Header from '../components/header/Header';
import style from './App.scss';

const stateToProps = state => ({ state });

const actionsToProps = dispatch => ({ dispatch });

class App extends Component {
    componentDidMount() {

    }

    render() {
        return (
            <Layout className={style.layout}>
                <Panel className={style.panel}>
                    <Header />
                    <div className={style.content}>
                        { this.props.children }
                    </div>
                </Panel>
            </Layout>
        );
    }
}

App.propTypes = {
    children: PropTypes.object
};

App.defaultTypes = {
    children: null
};

export default connect(stateToProps, actionsToProps)(App);
