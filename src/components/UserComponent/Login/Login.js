import React from "react";
import {login} from "../../../services/UserServices";
import styles from "./Login.css"

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
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <a className="navbar-brand" href="/">Home</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse"
                            data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false"
                            aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse justify-content-end" id="navbarNavDropdown">
                        <ul className="navbar-nav">
                            <li className="nav-item active">
                                <a className="nav-link" href="/login">Login <span className="sr-only">(current)</span></a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/register">Register</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/profile">Profile</a>
                            </li>
                        </ul>
                    </div>
                </nav>

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
