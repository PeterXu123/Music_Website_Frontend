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
        gender: 'male',
        favList: [],
        friendList: [],


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
        getUser(this.props.user.userId)
            .then((user) => {
                console.log(user)
                if (user != undefined){
                    this.setState({favList: user.favouriteMusic, friendList: user.friends})
                }

            })
        console.log(this.state.friendList)
        this.setState({
            username: this.props.user.username,
            email: this.props.user.email,
            phoneNumber: this.props.user.phoneNumber,
            gender: !this.props.user.gender ? 'male' : this.props.user.gender
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
                            favList: user.favouriteMusic,

                        })
                        console.log("line 99")
                        getUser(this.props.user.userId)
                            .then((user) => {
                                console.log(user)
                                this.setState({friendList: user.friends})
                            })



                    })
            } else {
                profile()
                    .then(profile => {
                        console.log(profile)
                        if (profile == undefined || profile.status === 403) {
                            this.props.history.push('/login')
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

        } else {
            if ((this.props.uId == undefined || this.props.uId == null) && this.props.user == '') {
                console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++")
                console.log(this.props.user)
                profile()
                    .then(profile => {
                        console.log(profile)
                        if (profile == undefined || profile.status === 403) {
                            // this.props.history.push('/login')
                            console.log("not logged in but visite my profile")
                            this.props.history.push("/login")

                        } else {
                            console.log(profile)
                            this.props.reconnect(profile)
                            console.log("line 109")
                            this.helper();
                            // this.setState({user: this.props.user})
                        }
                    })
            } else {
                console.log("-----------------------------")
                console.log(this.state.friendList)
                // profile()
                //     .then(profile => {
                //         console.log(profile)
                //         if (profile == undefined || profile.status === 403) {
                //             // this.props.history.push('/login')
                //             console.log("not logged in")
                //
                //         } else {
                //             console.log(profile)
                //             this.props.reconnect(profile)
                //             getUser(this.props.user.userId)
                //                 .then((user) => {
                //                     console.log(user)
                //                     this.setState({friendList: user.friends})
                //                 })
                //
                //
                //
                //         }
                //     })
                // getUser(this.props.uId)
                //     .then((user) => {
                //         console.log(user)
                //         this.setState({
                //             username: user.username,
                //             email: user.email,
                //             favList: user.favouriteMusic
                //         })
                //
                //
                //     })
            }
        }
    }

    componentDidMount() {
        console.log("component did mount")
        console.log(this.props)

        if (this.props.uId != undefined || this.props.uId != null) {
            console.log(this.props.uId)
            console.log(this.state.friendList)
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
                            getUser(this.props.user.userId)
                                .then((user) => {
                                    console.log(user)
                                    this.setState({friendList: user.friends})
                                })



                        }
                    })
            }
            getUser(this.props.user.userId)
                .then((user) => {
                    console.log(user)
                    if (user != undefined) {
                    this.setState({friendList: user.friends})
                    }
                })


            getUser(this.props.uId)
                .then((user) => {
                    console.log(user)
                    this.setState({
                        username: user.username,
                        email: user.email,
                        favList: user.favouriteMusic,
                    })
                })
        } else if (this.props.user == '') {
            console.log(this.props.user)
            profile()
                .then(profile => {
                    console.log(profile)
                    if (profile == undefined || profile.status === 403) {
                        // this.props.history.push('/login')
                        console.log("not logged in")
                        this.props.history.push('/login')

                    } else {
                        console.log(profile)
                        this.props.reconnect(profile)
                        console.log("line 109")
                        this.helper();
                        // this.setState({user: this.props.user})
                    }
                })

        } else {
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
        let obj = {selfId: this.props.user.userId, otherId: fid};
        console.log(obj)
        addToFriendList(obj).then(r => {
            console.log(r)
            this.setState({friendList: r.friends})
        })
    }

    removeFriend(fid) {
        console.log("remove friend")
        let obj = {selfId: this.props.user.userId, otherId: fid};
        removeFromFriendList(obj).then(r => {
            alert("Unfollow successfully")
            this.setState({friendList: r.friends})
        })
    }

    updateProfile = () => {
        console.log(this.props.user.userId)
        updateUser(this.props.user.userId, {username: this.state.username, phoneNumber: this.state.phoneNumber, gender: this.state.gender})
            .then((updatedUser) => {
                console.log(updatedUser)
                this.props.reconnect(updatedUser)
                console.log(this.props.user)
                alert("save successfully " + updatedUser.gender)

            })
            .catch((error) => console.log(error))
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

                                <div className={styles.option}>
                                    <label id={'gender'}>  Your Gender </label>
                                    &nbsp;
                                    <select value={this.state.gender} disabled={this.props.uId != undefined}
                                            onChange={(e) => {this.setState({gender: e.target.value})}}>
                                        <option value={'male'}>Male</option>
                                        <option value={'female'}>Female</option>
                                        <option value={'other'}>Other</option>
                                    </select>

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
                            <React.Fragment>
                                <button onClick={() => this.updateProfile()}
                                        className="btn btn-success">update profile
                                </button>
                                &nbsp;
                                <button className={"btn btn-info"}
                                        onClick={() => this.props.history.push('/friends')}> my friends
                                </button>
                                &nbsp;
                                {this.props.user != undefined && this.props.user.role != undefined && this.props.user.role == "admin" ?
                                    <button className={"btn btn-danger"} onClick={() =>  this.props.history.push('/manage')}>admin</button>
                                    : null
                                }

                            </React.Fragment>

                        }

                    </div>

                    <div>
                        {this.props.uId != undefined && this.props.user != '' ?
                            <React.Fragment>
                            {
                                this.state.friendList.filter(i => i == this.props.uId).length == 0 ?

                                    <React.Fragment>
                                        <button onClick={() => this.addToFriend(this.props.uId)}
                                                className="btn btn-success">Follow him
                                        </button>

                                    </React.Fragment> :
                                    <React.Fragment>
                                        <button onClick={() => this.removeFriend(this.props.uId)}
                                                className="btn btn-danger">UnFollow him
                                        </button>

                                    </React.Fragment>
                            }</React.Fragment> : null


                        }

                    </div>


                    <div className={"row"}>

                        <div className={"col-12"}>
                            <div className="list-group">
                                <label>Favourite songs</label>
                                {this.state.favList.map(music =>
                                    <div key={music.musicId}>
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

                        {/*<div className={"col-6"}>*/}
                        {/*    <div className="list-group">*/}


                        {/*        <label>Friend Lists</label>*/}
                        {/*        {this.state.friendList.map(friend =>*/}
                        {/*            <div>*/}
                        {/*                <li className="list-group-item">*/}
                        {/*                    <i>{friend}</i>*/}

                        {/*                    <li className={`fa fa-trash  fa fa-2x   ${styles.floatRight} ${styles.pointer}`}></li>*/}
                        {/*                </li>*/}
                        {/*            </div>)}*/}
                        {/*    </div>*/}
                        {/*    {this.props.user != "" &&( this.props.uId != undefined || this.props.uId != null)*/}
                        {/*        ? <button className="btn btn-success">Follow this guy</button>*/}
                        {/*        : null}*/}
                        {/*    {this.props.user != "" &&( this.props.uId != undefined || this.props.uId != null)*/}
                        {/*        ? <button className="btn btn-danger"> Unfollow this guy</button>*/}
                        {/*        : null}*/}

                        {/*</div>*/}

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
