/**
 * Created by Raul on 17/10/2016.
 */
import React, { Component } from 'react';
import {Navbar, Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import Snackbar from 'material-ui/Snackbar';

import $ from 'jquery';

var NavCss = {
    borderRadius: 0

};

const url ='http://localhost/goodgaming/public/';

export default class Layout extends Component{
    constructor(props){
        super(props);

        this.state={
            user: {},
            username: '',
            action: '',
            open: false,
            errors:[''],
            erroropen:false,
            name: '',
            email: '',
            password: '',
            confirmpass: ''
        };

    }

    componentDidMount(){
        this.loadUser();
    }

    loadUser(){
        $.ajax({
            type: 'GET',
            url: url + 'getuser',
            context: this,
            dataType: 'json',
            cache: false,
            success: function (data) {
                if(data.error){
                    //Si hay errores guardarlos
                    this.setState({errors: data.error.msg});
                }else{
                    //Guardo el usuario logeado
                    this.setState({username: data}, function(){
                        console.log("user: " + this.state.username);
                    });
                }
            }.bind(this),
            error: function (xhr, status, err) {
                //Error
                console.error(this.props.url, status, err.toString());
            }
        });
    }

    userElement(){
        if(this.state.username !== ''){
            return(
                <NavDropdown eventKey={3} title={this.state.username} id="basic-nav-dropdown">
                    <MenuItem eventKey={3.1}>My info</MenuItem>
                    <MenuItem eventKey={3.2}>Logout</MenuItem>
                </NavDropdown>
            );
        }else{
            return(
                <NavDropdown eventKey={3} title="Log in/Sign in" id="basic-nav-dropdown">
                    <MenuItem eventKey={3.1} onClick={this.handleOpenLoginModal.bind(this)}>Log in</MenuItem>
                    <MenuItem eventKey={3.2} onClick={this.handleOpenSignupModal.bind(this)}>Sign in</MenuItem>
                </NavDropdown>
            );
        }
    }

    handleOpenLoginModal(){
        this.setState({
            action: 'LOGIN'
        }, function () {
            this.setState({open: true});
        });
    }

    handleOpenSignupModal(){
        this.setState({
            action: 'SIGNUP'
        }, function () {
            this.setState({open: true});
        });
    }

    closeModal(){
        this.setState({
            open: false
        });
    }

    handleCloseError(){
        this.setState({erroropen: false});
    }

    handleName(e){
        this.setState({
            name: e.target.value
        });
    }

    handleEmail(e){
        this.setState({
            email: e.target.value
        });
    }

    handlePassword(e){
        this.setState({
            password: e.target.value
        });
    }

    handleConfirmPassword(e){
        this.setState({
            confirmpass: e.target.value,
        });
    }

    signup(){
        var token = $('meta[name="csrf-token"]').attr('content');
        $.ajax({
            type: 'POST',
            url: url + 'createuser',
            context: this,
            dataType: 'json',
            cache: false,
            data:{
                name: this.state.name,
                email: this.state.email,
                password: this.state.password,
                confirmpass: this.state.confirmpass,
                _token: token
            },
            success: function (data) {
                if(data.error){
                    //Si hay errores guardarlos
                    this.setState({errors: [data.error.msg]}, function(){
                        this.setState({erroropen: true});
                    });
                }else{
                    //Guardo el usuario logeado
                    this.loadUser();
                    this.setState({
                        open: false,
                        name: '',
                        email: '',
                        password: '',
                        confirmpass: ''
                    });
                }
            }.bind(this),
            error: function (xhr, status, err) {
                //Error
                console.error(this.props.url, status, err.toString());
            }
        });
    }

    login(){
        $.ajax({
            type: 'POST',
            url: url + 'login',
            context: this,
            dataType: 'json',
            cache: false,
            data: {
                email: this.state.email,
                password: this.state.password
            },
            success: function (data) {
                if(data.error){
                    //Si hay errores guardarlos
                    this.setState({errors: [data.error.msg]}, function(){
                        this.setState({erroropen: true});
                    });
                }else{
                    //Guardo el usuario logeado
                    this.loadUser();
                    this.setState({
                        open: false,
                        name: '',
                        email: '',
                        password: '',
                        confirmpass: ''
                    });
                }
            }.bind(this),
            error: function (xhr, status, err) {
                //Error
                console.error(this.props.url, status, err.toString());
            }
        });
    }

    render() {
        var actions =[];
        var content =[];
        var title='';
        if(this.state.action === 'LOGIN'){
            title= 'Log in';
            actions = [
                <FlatButton
                    label="Login"
                    primary={true}
                    keyboardFocused={true}
                    onTouchTap={this.login.bind(this)}
                />,
                <FlatButton
                    label="Cancel"
                    primary={true}
                    onTouchTap={this.closeModal.bind(this)}
                />
            ];
            content=[
                    <div className="col-md-12">
                        <div className="col-md-6">
                            <TextField
                                hintText="Email"
                                floatingLabelText="Email"
                                type="text"
                                fullWidth={true}
                                onChange={this.handleEmail.bind(this)}
                            />
                        </div>
                        <div className="col-md-6">
                            <TextField
                                hintText="Password"
                                floatingLabelText="Password"
                                type="password"
                                fullWidth={true}
                                onChange={this.handlePassword.bind(this)}
                            />
                        </div>
                    </div>
            ];
        }else if(this.state.action ==='SIGNUP'){
            title= 'Sign in';
            actions = [
                <FlatButton
                    label="Sign in"
                    primary={true}
                    keyboardFocused={true}
                    onTouchTap={this.signup.bind(this)}
                />,
                <FlatButton
                    label="Cancel"
                    primary={true}
                    onTouchTap={this.closeModal.bind(this)}
                />
            ];
            content=[
                <div className="col-md-12">
                    <div className="col-md-6">
                        <TextField
                            hintText="Email"
                            floatingLabelText="Email"
                            type="text"
                            fullWidth={true}
                            onChange={this.handleEmail.bind(this)}
                        />
                    </div>
                    <div className="col-md-6">
                        <TextField
                            hintText="Username"
                            floatingLabelText="Username"
                            type="text"
                            fullWidth={true}
                            onChange={this.handleName.bind(this)}
                        />
                    </div>
                    <div className="col-md-6">
                        <TextField
                            hintText="Password"
                            floatingLabelText="Password"
                            type="password"
                            fullWidth={true}
                            onChange={this.handlePassword.bind(this)}
                        />
                    </div>
                    <div className="col-md-6">
                        <TextField
                            hintText="Confirm Password"
                            floatingLabelText="Confirm Password"
                            type="password"
                            fullWidth={true}
                            onChange={this.handleConfirmPassword.bind(this)}
                        />
                    </div>
                </div>
            ];
        }

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
                                </Nav>
                                <Nav pullRight>
                                    {this.userElement()}
                                </Nav>
                            </Navbar>
                        </div>
                        <div>
                            {this.props.children}
                        </div>
                        <Dialog
                            title={title}
                            actions={actions}
                            modal={true}
                            open={this.state.open}
                            autoScrollBodyContent={true}
                        >
                            {content}
                        </Dialog>

                        <Snackbar
                            open={this.state.erroropen}
                            message={this.state.errors[0]}
                            autoHideDuration={4000}
                            onRequestClose={this.handleCloseError.bind(this)}
                        />
                    </div>
                </MuiThemeProvider>
            </div>
        );
    }
}