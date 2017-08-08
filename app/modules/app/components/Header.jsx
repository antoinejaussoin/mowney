import PropTypes from 'prop-types';
import React from 'react';
import noop from 'lodash/noop';
import flow from 'lodash/flow';
import AppBar from 'react-toolbox/lib/app_bar';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import translate from 'i18n/Translate';
import { getCurrentUser } from 'modules/user/selectors';
import style from './Header.scss';
import Menu from './Menu';

const stateToProps = state => ({
  user: getCurrentUser(state)
});

const actionsToProps = dispatch => ({
  goToHomepage: () => dispatch(push('/'))
});

const Header = ({ strings, goToHomepage, user }) => (
  <div>
    <AppBar fixed className={style.header}>
      <div className={style.titles}>
        <a onClick={goToHomepage}>Mowney <br />
          <span className={style.subtitle}>{ strings.subtitle }</span>
        </a>
      </div>
      <div className={ style.navigation }>
        <Menu />
        <span className={style.user}>{ user }</span>
      </div>
    </AppBar>
  </div>
);

Header.propTypes = {
  user: PropTypes.string,
  goToHomepage: PropTypes.func,
  strings: PropTypes.object
};

Header.defaultTypes = {
  user: null,
  goToHomepage: noop,
  strings: {
    subtitle: 'Personal finance'
  }
};

const decorators = flow([
  connect(stateToProps, actionsToProps),
  translate('Header')
]);

export default decorators(Header);
