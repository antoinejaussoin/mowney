import React, { Component, PropTypes } from 'react';
import flow from 'lodash/flow';
import { connect } from 'react-redux';
import { Input } from 'react-toolbox/lib/input';
import { Button } from 'react-toolbox/lib/button';
import translate from '../i18n/Translate';
import { login } from '../state/user';
import Container from '../components/Container';


const stateToProps = state => ({
    state
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
                      onClick={() => this.props.login(this.state.username, this.state.password)}
                    />
                </p>
            </Container>
        );
    }
}

Login.propTypes = {
    login: PropTypes.func
};

const decorators = flow([
    connect(stateToProps, actionsToProps),
    translate('Login')
]);

export default decorators(Login);
