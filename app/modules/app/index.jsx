import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { Layout, Panel } from 'react-toolbox/lib/layout';
import Header from './components/Header';
import { initialise } from './state';
import style from './index.scss';

const stateToProps = state => ({ state });

const actionsToProps = dispatch => ({
  initialise: () => dispatch(initialise())
});

class App extends Component {
  componentDidMount() {
    this.props.initialise();
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
  children: PropTypes.object,
  initialise: PropTypes.func
};

App.defaultTypes = {
  children: null,
  initialise: () => {}
};

export default connect(stateToProps, actionsToProps)(App);
