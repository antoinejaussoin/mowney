import React from 'react';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/lib/Button';
import Navbar from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';
import Component from '../Component';
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
            <div className="container-fluid">
                <Navbar>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <a>Mowney</a>
                        </Navbar.Brand>
                    </Navbar.Header>
                    <Nav>
                        <NavItem eventKey={1} href="#">Link</NavItem>
                        <NavItem eventKey={2} href="#">Link</NavItem>
                    </Nav>
                </Navbar>
                <div clasName="offcanvas">
                    <div clasName="offcanvas-pane width-6" id="offcanvas1">
                        ~ Offcanvas content ~
                    </div>
                    <div clasName="offcanvas-pane width-6" id="offcanvas2">
                        ~ Offcanvas content ~
                    </div>
                </div>
                <Button bsStyle="primary">Hello</Button>
                <div className="card">
                    <div className="card-body text-default-light">
                        <p>
                            Ad ius duis dissentiunt, an sit harum primis persecuti, adipisci
                            tacimates mediocrem sit et. Id illud voluptaria omittantur qui,
                            te affert nostro mel. Cu conceptam vituperata temporibus has.
                        </p>
                    </div>
                    <div className="card-actionbar">
                        <div className="card-actionbar-row">
                            <a className="btn btn-icon-toggle btn-danger ink-reaction pull-left">
                                <i className="fa fa-heart" />
                            </a>
                            <a className="btn btn-icon-toggle btn-default ink-reaction pull-left">
                                <i className="fa fa-reply" />
                            </a>
                            <a className="btn btn-flat btn-default-dark ink-reaction">
                              Submit
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Main;
