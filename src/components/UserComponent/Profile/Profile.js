import React from "react";
import styles from "./Profile.module.css"
import {
    profile,
    logout,
    addToFriendList,
    removeFromFriendList,
    updateUser,
    getUser,
    removeFav,

} from "../../../services/UserServices";
import Navbar from "../Navbar/Navbar";
import {connect} from "react-redux";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Link} from "react-router-dom";

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.time = ''

    }

    state = {
        username: '',
        email: '',
        phoneNumber: '',
        favList: []


    }
    //
    // componentDidUpdate(prevProps, prevState, snapshot) {
    //
    //
    //     if (this.props.uId != prevProps.uId) {
    //         getUser(this.props.uId)
    //             .then((user) => {
    //                 console.log(user)
    //                 this.setState({
    //                     username: user.username,
    //                     email: user.email,
    //                     favList: user.favouriteMusic
    //                 })
    //
    //
    //             })
    //     }
    //
    //
    // }


    helper = () => {

        this.setState({
            username: this.props.user.username,
            email: this.props.user.email,
            phoneNumber: this.props.user.phoneNumber
        })
        getUser(this.props.user.userId)
            .then((user) => {
                console.log(user)
                this.setState({favList: user.favouriteMusic})
            })

        clearTimeout(this.time)

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

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log("component did update")
        console.log(prevProps)
        console.log(this.props)
        if (this.props.uId != prevProps.uId) {
            if (this.props.uId != undefined || this.props.uId != null) {
                getUser(this.props.uId)
                    .then((user) => {
                        console.log(user)
                        this.setState({
                            username: user.username,
                            email: user.email,
                            favList: user.favouriteMusic
                        })


                    })
            }
            else {
                profile()
                    .then(profile => {
                        console.log(profile)
                        if (profile == undefined || profile.status === 403) {
                            // this.props.history.push('/login')
                            console.log("not logged in")

                        } else {
                            console.log(profile)
                            this.props.reconnect(profile)
                            console.log("line 109")
                            this.helper();
                            // this.setState({user: this.props.user})
                        }
                    })

            }

        }
    }

    componentDidMount() {
        console.log("component did mount")
        console.log(this.props)
        if (this.props.uId != undefined || this.props.uId != null) {
            console.log(this.props.uId)
            if (this.props.user == '') {
                profile()
                    .then(profile => {
                        console.log(profile)
                        if (profile == undefined || profile.status === 403) {
                            // this.props.history.push('/login')
                            console.log("not logged in")

                        } else {
                            console.log(profile)
                            this.props.reconnect(profile)

                        }
                    })
            }
            getUser(this.props.uId)
                .then((user) => {
                    console.log(user)
                    this.setState({
                        username: user.username,
                        email: user.email,
                        favList: user.favouriteMusic
                    })


                })
        }
        else if (this.props.user == '') {
            console.log(this.props.user)
            profile()
                .then(profile => {
                    console.log(profile)
                    if (profile == undefined || profile.status === 403) {
                        // this.props.history.push('/login')
                        console.log("not logged in")

                    } else {
                        console.log(profile)
                        this.props.reconnect(profile)
                        console.log("line 109")
                        this.helper();
                        // this.setState({user: this.props.user})
                    }
                })

        }
        else {
            this.helper();
        }


    }

    componentWillUnmount() {
        clearTimeout(this.time);
    }

    removeFavorite = (songId) => {
        console.log(songId)
        console.log(this.props.user.userId)
        let record = {
            songId: songId,
            userId: this.props.user.userId
        }
        removeFav(record)
            .then((succeed) => this.helper())
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

                    {this.props.user || this.props.uId ?
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

                                            return {...prevState, username: e.target.value}
                                        })
                                    }}
                                    disabled={this.props.uId != undefined}
                                    type="text"
                                    className="form-control"
                                    id={"username"}
                                    placeholder="username"/>
                            </div>
                            {this.props.uId != undefined ? null :
                                <div className="form-group">
                                    <label htmlFor="phoneNumber">Phone Number</label>
                                    <input
                                        value={this.state.phoneNumber}
                                        onChange={(e) => {

                                            this.setState(prevState => {

                                                return {...prevState.user, phoneNumber: e.target.value}
                                            })
                                        }}
                                        type={"number"}
                                        className="form-control"
                                        id={"phoneNumber"}
                                        placeholder="phone number"/>
                                </div>
                            }


                        </div> : null}


                    <div>
                        {this.props.uId != undefined ? null :
                            <button onClick={() => this.updateProfile(this.props.user.userId, this.state.user)}
                                    className="btn btn-success">update profile
                            </button>}

                    </div>


                    <div className={"row"}>

                        <div className={"col-6"}>
                            <div className="list-group">
                                <label>Favourite songs</label>
                                {this.state.favList.map(music =>
                                    <div>
                                        <li className="list-group-item">

                                            <Link to={`/song/${music.musicId}`}>{music.title}</Link>

                                            {this.props.uId == undefined ?
                                                <i onClick={() => this.removeFavorite(music.musicId)}
                                                   className={`fa fa-trash  fa fa-2x   ${styles.floatRight} ${styles.pointer}`}></i>
                                                : null}

                                        </li>


                                    </div>)}
                            </div>

                        </div>

                        <div className={"col-6"}>
                            <div className="list-group">
                                <label>Friend Lists</label>
                                {[].map(friend =>
                                    <div>
                                        <li className="list-group-item">
                                            <i>fake</i>

                                            <li className={`fa fa-trash  fa fa-2x   ${styles.floatRight} ${styles.pointer}`}></li>
                                        </li>
                                    </div>)}
                            </div>

                        </div>

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
