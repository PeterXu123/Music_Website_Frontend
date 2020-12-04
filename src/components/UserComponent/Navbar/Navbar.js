import React, {Component} from 'react';
import {logout} from "../../../services/UserServices";
import {withRouter} from "react-router";
import {Link, NavLink} from "react-router-dom";
import styles from './Navbar.module.css'
import {connect} from "react-redux";

class Navbar extends Component {
    constructor(props) {
        super(props);
    }
    onLogout = () => {
        console.log('logout')
        logout()
            .then((info) => {
                console.log(info)
                this.props.logout()
                this.props.history.push("/")
            })

    }
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <a className="navbar-brand" href="/">Home</a>
                {this.props.user !== '' ?
                    <button className={` ${styles.t} btn`} onClick={this.onLogout}>

                        Logout

                    </button> : null
                }
                <button className="navbar-toggler" type="button" data-toggle="collapse"
                        data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false"
                        aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className={`collapse navbar-collapse justify-content-end ${styles.band}`} id="navbarNavDropdown">
                    <ul className="navbar-nav">
                        { this.props.user == '' ?
                            <React.Fragment>
                            <div className={`nav-item ${styles.t}`}>
                                <NavLink to="/login" activeClassName={`${styles.selected}`}>
                                    Login
                                </NavLink>

                            </div>
                            <div className={`nav-item ${styles.t}`}>
                            <NavLink to="/register" activeClassName={`${styles.selected}`} >
                            Register
                            </NavLink>

                            </div>
                            </React.Fragment>:                  <div className={`nav-item ${styles.t}`}>
                                <NavLink to="/profile" activeClassName={`${styles.selected}`} >
                                    Profile
                                </NavLink>

                            </div>
                        }

                    </ul>
                </div>
            </nav>
        );
    }
}

Navbar.propTypes = {};
const stateToPropertyMapper = (state) => ({
    user: state.userReducer.user,
    expired: state.userReducer.expired,
    rest: state.userReducer.rest,
});

const propertyToDispatchMapper = (dispatch) => ({

    logout: () => dispatch({type: "LOGOUT"})
});

export default  connect(stateToPropertyMapper, propertyToDispatchMapper)(withRouter(Navbar));
