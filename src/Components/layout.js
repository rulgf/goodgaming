/**
 * Created by Raul on 17/10/2016.
 */
import React, { Component } from 'react';
import {Navbar, Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

var NavCss = {
    borderRadius: 0

};

export default class Layout extends Component{
    render() {
        return(
            <div name="root">
                <MuiThemeProvider>
                    <div>
                        <div>
                            <Navbar inverse style={NavCss}>
                                <Navbar.Header>
                                    <Navbar.Brand>
                                        <a href="#">Good-Gaming</a>
                                    </Navbar.Brand>
                                </Navbar.Header>
                                <Nav>
                                    <NavItem eventKey={1} href="#/games">Games</NavItem>
                                    <NavItem eventKey={2} href="#/lists">Lists</NavItem>
                                </Nav>
                                <Nav pullRight>
                                    <NavDropdown eventKey={3} title="User" id="basic-nav-dropdown">
                                        <MenuItem eventKey={3.1}>Action</MenuItem>
                                        <MenuItem eventKey={3.2}>Another action</MenuItem>
                                        <MenuItem eventKey={3.3}>Something else here</MenuItem>
                                        <MenuItem divider />
                                        <MenuItem eventKey={3.3}>Separated link</MenuItem>
                                    </NavDropdown>
                                </Nav>
                            </Navbar>
                        </div>
                        <div>
                            {this.props.children}
                        </div>

                    </div>
                </MuiThemeProvider>
            </div>
        );
    }
}