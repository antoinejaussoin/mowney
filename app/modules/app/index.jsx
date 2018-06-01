import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Layout, Panel } from 'react-toolbox/lib/layout';
import Button from 'components/Button';
import { selectIsLoggedIn } from 'modules/user/selectors';
import Header from './components/Header';
import { initialise } from './state';
import style from './index.scss';

const stateToProps = state => ({
  isLoggedIn: selectIsLoggedIn(state)
});

const actionsToProps = dispatch => ({
  initialise: () => dispatch(initialise()),
  goToLogin: () => dispatch(push('/login'))
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
          { this.props.isLoggedIn || this.props.location.pathname === '/login' ?
            <div className={style.content}>
              { this.props.children }
            </div> :
            <div className={style.content}>
              Not logged in<br /><br />
              <Button label="Login" onClick={this.props.goToLogin} accent raised />
            </div>
          }
        </Panel>
      </Layout>
    );
  }
}

App.propTypes = {
  children: PropTypes.object,
  location: PropTypes.object,
  isLoggedIn: PropTypes.bool,
  initialise: PropTypes.func,
  goToLogin: PropTypes.func
};

App.defaultTypes = {
  children: null,
  isLoggedIn: false,
  initialise: () => {}
};

export default connect(stateToProps, actionsToProps)(App);
