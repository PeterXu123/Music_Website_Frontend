import React  from "react";
import {register} from "../../../services/UserServices";
import styles from "./Register.css"


export default class Register extends React.Component {
    state = {
        username: '',
        password: '',
        verifyPassword: ''
    }

    register = (user) =>
        register(user)
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
                    <h3>Register</h3>
                    <div>
                        <input
                            value = {this.state.username}
                            onChange={(e) => this.setState({
                                username: e.target.value
                            })}
                            className= "form-control"
                            placeholder= "username"/>
                    </div>
                    <input
                        type= "password"
                        value = {this.state.password}
                        onChange={(e) => this.setState({
                            password: e.target.value
                        })}
                        className= "form-control"
                        placeholder= "password"/>
                    <input
                        type= "password"
                        value = {this.state.verifyPassword}
                        onChange={(e) => this.setState({
                            verifyPassword: e.target.value
                        })}
                        className= "form-control"
                        placeholder= "verify password"
                    />
                    <button
                        onClick ={() => this.register(this.state)}
                        className="btn btn-primary btn-block">
                        Register
                    </button>
                </div>

            </div>
        )
    }
}
