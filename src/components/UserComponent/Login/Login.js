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
            username: '',
            password: '',
        }
    }


    login = (user) =>
        login(user)
            .then(newUser => {

                    console.log(newUser)
                    this.props.login1(newUser);
                    console.log(newUser)
                    console.log(newUser)
                    this.props.history.push('/profile')

            }).catch(error=>alert("please check username and password"))

    render() {
        return (
            <div>
                <Navbar></Navbar>

                <div className="col-md-6 col-centered">
                    <h2>Login</h2>
                    <input
                        value={this.state.username}
                        onChange={(e) => this.setState({
                            username: e.target.value
                        })}
                        className="form-control"
                        placeholder="username"/>
                    <input
                        type="password"
                        value={this.state.password}
                        onChange={(e) => this.setState({
                            password: e.target.value
                        })}
                        className="form-control"
                        placeholder="password"/>
                    <button
                        onClick={() => this.login(this.state)}
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
    login1: (user) => dispatch({type: "CONNECT", user: user.username, rest: user.rest, expired: user.expired})

});


export default connect(stateToPropertyMapper, propertyToDispatchMapper)(Login)
