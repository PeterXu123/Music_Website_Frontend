import React from "react";
import {profile, logout, addToFriendList, removeFromFriendList, updateUser} from "../../../services/UserServices";
import Navbar from "../Navbar/Navbar";
import {connect} from "react-redux";

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.time = ''

    }

    state = {
        username: '',
        email: '',
        phoneNumber: '',


    }


    helper = () => {
        this.setState({username: this.props.user.username, email: this.props.user.email, phoneNumber: this.props.user.phoneNumber})
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
            console.log(this.props.user.username)

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
                        // this.setState({user: this.props.user})
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

    addToFriend(fid) {
        console.log("addFriend")
        let fobj = {fid: fid}
        addToFriendList(fobj).then(r => console.log(r))
    }

    removeFriend(fid) {
        console.log("remove friend")
        let fobj = {fid: fid}
        removeFromFriendList(fobj).then(r => console.log(r))
    }

    updateProfile = () => {
        console.log(this.props.user)
        updateUser(this.props.user.userId, {username: this.state.username, phoneNumber: this.state.phoneNumber})
            .then((updatedUser) => {
                console.log(updatedUser)
                this.props.reconnect(updateUser)
                alert("save successfully")

            })
    }



    render() {
        return (
            <React.Fragment>
                <Navbar></Navbar>
                <div className="container">
                    {this.props.user ?
                        <div>
                            <div className="form-group">
                                <label htmlFor="email">Email address</label>
                                <input
                                    value={this.state.email}
                                    type={'email'}
                                    className="form-control"
                                    disabled={true}
                                    placeholder="email"/>
                            </div>

                            <div className="form-group">
                                <label htmlFor="username">Username</label>
                                <input
                                    value={this.state.username}
                                    onChange={(e) => {
                                        this.setState(prevState => {

                                            return {...prevState, username: e.target.value }
                                        })
                                    }}
                                    type="text"
                                    className="form-control"
                                    id={"username"}
                                    placeholder="username"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="phoneNumber">Phone Number</label>
                                <input
                                    value={this.state.phoneNumber}
                                    onChange={(e) => {

                                        this.setState(prevState => {

                                            return  {...prevState.user, phoneNumber: e.target.value}
                                        })
                                    }}
                                    type={"number"}
                                    className="form-control"
                                    id={"phoneNumber"}
                                    placeholder="phone number"/>
                            </div>


                        </div> : null}


                    <div>
                        <li onClick={() => this.addToFriend(this.props.userId)}
                            className="btn btn-info">add friend
                        </li>

                        <li onClick={() => this.removeFriend(this.props.userId)}
                            className="btn btn-danger">remove friend
                        </li>
                        <li onClick={() => this.updateProfile(this.props.userId, this.state.user)}
                            className="btn btn-success">update friend
                        </li>
                    </div>
                </div>
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
    reconnect: (user) => dispatch({type: "CONNECT", user: user, rest: user.rest, expired: user.expired}),
    logout: () => dispatch({type: "LOGOUT"})

});


export default connect(stateToPropertyMapper, propertyToDispatchMapper)(Profile)
