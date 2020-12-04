import React from "react";
import {profile, logout} from "../../services/UserServices";
import Navbar from "./Navbar/Navbar";
import {connect} from "react-redux";

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.time = ''

    }

    state = {

        username: ''
    }


    helper = () => {
        this.setState({username: this.props.user})
        this.time = setTimeout(() => {
            logout()
                .then((info) => {
                    console.log(info)
                    this.props.logout();
                    this.props.history.push('/login')
                })
                .catch(error => console.log(error))

        }, 1000 * 60 * 60)
    }

    componentDidMount() {
        if (this.props.user !== '') {
            console.log(this.props);
            console.log(this.props.user)

            this.helper();
        } else {
            console.log(this.props)
            profile()
                .then(profile => {
                    if (profile.status === 403) {
                        this.props.history.push('/login')
                    } else {
                        console.log(profile)
                        this.props.reconnect(profile)
                        this.helper();
                    }
                })
                .catch(error => {
                    console.log(error)
                    this.props.history.push('/login')
                })

        }

    }

    componentWillUnmount() {
        clearTimeout(this.time);
    }

    render() {
        return (
            <React.Fragment>
                {this.props.user ? <div>
                    <Navbar></Navbar>
                    <h1>Profile</h1>
                    Username: {this.state.username}
                </div> : null}

            </React.Fragment>
        )
    }
}

const stateToPropertyMapper = (state) => ({
    user: state.userReducer.user,
    expired: state.userReducer.expired,
    rest: state.userReducer.rest,

});

const propertyToDispatchMapper = (dispatch) => ({
    reconnect: (user) => dispatch({type: "CONNECT", user: user.username, rest: user.rest, expired: user.expired}),
    logout: () => dispatch({type: "LOGOUT"})

});


export default connect(stateToPropertyMapper, propertyToDispatchMapper)(Profile)
