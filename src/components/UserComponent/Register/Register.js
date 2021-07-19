import React from "react";
import {register} from "../../../services/UserServices";
import styles from "./Register.module.css"
import Navbar from "../Navbar/Navbar";
import {connect} from "react-redux";


class Register extends React.Component {
    state = {
        username: '',
        email: '',
        password: '',
        verifyPassword: '',
        gender: "male",
        valid: false
    }
    checkLoinInform = () => {
        let emailCheck = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
        if (emailCheck.test(this.state.email) && this.state.password !== '' && this.state.username !== ''
            && this.state.verifyPassword !== ''
        ) {

            this.setState({valid: true})
        }
        else {
            this.setState({valid: false})
        }

    }

    register = (user) => {

        if (user.password !== user.verifyPassword) {
            alert("Password don't match");
        } else {
            const u = {...this.state};
            delete u.verifyPassword;
            register(u)
                .then(u => {
                    this.props.register(u)
                    this.props.history.push('/profile')
                }).catch(error => {
                    console.log(error)
                    alert("user exits")
            })
        }
    }


    render() {
        return (
            <div>
                <Navbar></Navbar>
                <div className="col-md-6 col-centered">
                    <h3>Register</h3>
                    <div>
                        <input
                            value={this.state.username}
                            onChange={(e) => {
                                this.setState({
                                    username: e.target.value
                                })
                                this.checkLoinInform()
                            }}
                            className="form-control"
                            required={true}
                            placeholder="username"/>
                    </div>
                    <input
                        value={this.state.email}
                        onChange={(e) => {
                            this.checkLoinInform()
                            this.setState({
                                email: e.target.value
                            })
                        }}
                        type="email"
                        required={true}
                        className="form-control"
                        placeholder="email"/>
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
                    <input
                        type="password"
                        value={this.state.verifyPassword}
                        onChange={(e) => {
                            this.checkLoinInform()
                            this.setState({
                                verifyPassword: e.target.value
                            })
                        }}
                        className="form-control"
                        placeholder="verify password"
                        required={true}
                    />


                    <div className={styles.option}>
                        <label id={'gender'}>  Your Gender </label>
                        &nbsp;
                        <select onChange={(e) => {this.setState({gender: e.target.value})}}>
                            <option value={'male'}>Male</option>
                            <option value={'female'}>Female</option>
                            <option value={'other'}>Other</option>
                        </select>

                    </div>



                    <button
                        disabled={!this.state.valid}
                        onClick={() => this.register(this.state)}
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
    register: (user) => dispatch({type: "CONNECT", user: user, rest: user.rest, expired: user.expired})

});


export default connect(stateToPropertyMapper, propertyToDispatchMapper)(Register)
