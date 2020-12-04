import React  from "react";
import {register} from "../../../services/UserServices";
import styles from "./Register.css"
import Navbar from "../Navbar/Navbar";
import {connect} from "react-redux";


class Register extends React.Component {
    state = {
        username: '',
        password: '',
        verifyPassword: ''
    }

    register = (user) => {

        if(user.password !== user.verifyPassword) {
            alert("Password don't match");
        }
        else {
            const u = {...this.state};
            delete u.verifyPassword;
            register(u)
                .then(u => {
                    this.props.register(u)
                    this.props.history.push('/profile')
                })
        }
    }


    render() {
        return(
            <div>
                <Navbar></Navbar>
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

const stateToPropertyMapper = (state) => ({});

const propertyToDispatchMapper = (dispatch) => ({
    register: (user) => dispatch({type: "CONNECT", user: user.name, rest: user.rest, expired: user.expired})

});


export default connect(stateToPropertyMapper, propertyToDispatchMapper)(Register)
