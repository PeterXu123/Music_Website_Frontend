import React from "react";
import {register} from "../../services/UserServices";

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
            <div className="container-fluid">
                <h1>Register</h1>
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
        )
    }
}
