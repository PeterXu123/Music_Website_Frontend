import React from "react";
import {login} from "../../../services/UserServices";
import styles from "./Login.css"
import Navbar from "../Navbar/Navbar";
import {searchArtist, searchSong} from "../../../services/SpotifyService";
import {connect} from "react-redux";

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            valid: false
        }
    }

    checkLoinInform = () => {
        let emailCheck = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
        if (emailCheck.test(this.state.email) && this.state.password !== '') {

            this.setState({valid: true})
        }
        else {
            this.setState({valid: false})
        }

    }

    login = (user) =>
        login(user)
            .then(newUser => {

                    this.props.login1(newUser);
                    this.props.history.push('/profile')

            }).catch(error=>alert("please check username and password"))

    render() {
        return (
            <div>
                <Navbar></Navbar>

                <div className="col-md-6 col-centered">
                    <h2>Login</h2>
                    <input
                        value={this.state.email}
                        onChange={(e) => {
                            this.checkLoinInform()
                            this.setState({
                                email: e.target.value
                            })
                        }}
                        type={'email'}
                        className="form-control"
                        required={true}
                        placeholder="username"/>
                    <input
                        type="password"
                        value={this.state.password}
                        onChange={(e) => {
                            this.checkLoinInform()
                            this.setState({
                                password: e.target.value
                            })
                        }}
                        className="form-control"
                        required={true}
                        placeholder="password"/>
                    <button
                        disabled={!this.state.valid}
                        onClick={() => this.login({email: this.state.email, password: this.state.password})}
                        className="btn btn-primary btn-block">
                        Login
                    </button>
                </div>

            </div>
        )
    }
}

const stateToPropertyMapper = (state) => ({});

const propertyToDispatchMapper = (dispatch) => ({
    login1: (user) => dispatch({type: "CONNECT", user: user,
        rest: user.rest, expired: user.expired})

});


export default connect(stateToPropertyMapper, propertyToDispatchMapper)(Login)
