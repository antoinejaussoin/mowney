import React, { Component, PropTypes } from 'react';
import flow from 'lodash/flow';
import { connect } from 'react-redux';
import { Input } from 'react-toolbox/lib/input';
import { Button } from 'react-toolbox/lib/button';
import translate from 'i18n/Translate';
import Container from 'components/Container';
import ErrorMessage from 'components/Error';
import { login } from './state';
import { getError, isPending } from './selectors';

const stateToProps = state => ({
  error: getError(state),
  isPending: isPending(state)
});

const actionsToProps = dispatch => ({
  login: (username, password) => dispatch(login({ username, password }))
});

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { username: '', password: '' };
  }
  render() {
    const canLogin = !this.props.isPending && this.state.username && this.state.password;
    return (
      <Container>
        <h3>Login</h3>
        <p>
          <Input
            value={this.state.username}
            label="Email"
            icon="email"
            onChange={username => this.setState({ username })}
          />
        </p>
        <p>
          <Input
            value={this.state.password}
            label="Password"
            type="password"
            icon="lock"
            onChange={password => this.setState({ password })}
          />
        </p>
        <p>
          <Button
            label="Login"
            accent
            raised
            disabled={ !canLogin }
            onClick={() => this.props.login(this.state.username, this.state.password)}
          />
        </p>
        <p>
          { this.props.error ? <ErrorMessage message={this.props.error} /> : null }
        </p>
      </Container>
    );
  }
}

Login.propTypes = {
  login: PropTypes.func,
  isPending: PropTypes.bool,
  error: PropTypes.string
};

const decorators = flow([
  connect(stateToProps, actionsToProps),
  translate('Login')
]);

export default decorators(Login);
