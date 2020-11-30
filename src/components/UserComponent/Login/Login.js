import React from "react";
import {login} from "../../../services/UserServices";
import styles from "./Login.css"
import Navbar from "../Navbar/Navbar";

export default class Profile extends React.Component {

    state = {
        username: '',
        password: '',
    }

    login = (user) =>
        login(user)
            .then(newUser => {
                console.log(newUser)
                this.props.history.push('/profile')
            })
    render() {
        return(
            <div>
                <Navbar></Navbar>

                <div className="col-md-6 col-centered">
                    <h2>Login</h2>
                    <input
                        value = {this.state.username}
                        onChange={(e) => this.setState({
                            username: e.target.value
                        })}
                        className= "form-control"
                        placeholder= "username"/>
                    <input
                        type= "password"
                        value = {this.state.password}
                        onChange={(e) => this.setState({
                            password: e.target.value
                        })}
                        className= "form-control"
                        placeholder= "password"/>
                    <button
                        onClick ={() => this.login(this.state)}
                        className="btn btn-primary btn-block">
                        Login
                    </button>
                </div>

            </div>
        )
    }
}
