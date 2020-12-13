import React, {useEffect, useState} from 'react';
import {withRouter} from "react-router";
import {connect} from "react-redux";
import {getFriendsById, getUser, profile, removeFromFriendList} from "../../../../services/UserServices";
import Navbar from "../../Navbar/Navbar";
import styles from  "./Friends.module.css"
import {Link} from "react-router-dom";
const Friends = (props) => {
    const [friends, setFriends] = useState([]);
    const [url, setURL] = useState([]);
    const deleteFriend = (oid) => {
        console.log(oid)
        let obj =  {selfId: props.user.userId , otherId: oid }
        removeFromFriendList(obj)
            .then((user) => {
                console.log(user)

                console.log(props.user)
                let newUser = {...user, userId: user._id};
                delete newUser['_id'];
                props.reconnect(newUser)

                // getUser(props.user.userId)
                //     .then((user) => {
                //         console.log(user)
                //
                //         setFriends(user.friends)
                //     })
            })
    }
    useEffect(() => {
        console.log("38")
        if (props.user == "") {
            profile()
                .then(profile => {
                    console.log(profile)
                    if (profile == undefined || profile.status === 403) {
                        // this.props.history.push('/login')
                        props.history.push("/login")

                    } else {
                        console.log(profile)
                        props.reconnect(profile)
                        console.log(props.user)
                        getFriendsById(props.user.userId)
                            .then((user) => {

                                console.log(user.friends)
                                let fs = user.friends.map(friend => {
                                    return friend

                                })
                                console.log(fs)
                                setFriends([...fs])
                            })


                    }
                })

        } else {
            console.log(props.user)

            getFriendsById(props.user.userId)
                .then((user) => {

                    console.log(user.friends)
                    let fs = user.friends.map(friend => {
                        return friend

                    })
                    console.log(fs)
                    setFriends([...fs])
                })
        }

    }, [])

    useEffect(() => {
        console.log("trigger")
        console.log(props.user)
        getFriendsById(props.user.userId)
            .then((user) => {

                console.log(user.friends)
                let fs = user.friends.map(friend => {
                    return friend

                })
                console.log(fs)
                setFriends([...fs])
            })
    }, [props.user])

    useEffect(() => {
        getFriendsById(props.user.userId)
            .then((user) => {

                console.log(user.friends)
                let fs = user.friends.map(friend => {
                    return friend

                })
                console.log(fs)
                setFriends([...fs])
            })
    }, [props.user.friends])
    return (
        <div>
            <Navbar></Navbar>
            <div className="container-fluid">
            <h3>Friends</h3>
            <div className="list-group">
                {friends.length > 0 ? friends.map(friend =>
                    <li className="list-group-item">
                        <Link to={`/profile/${friend._id}`}>{friend.username}</Link>

                    <i className={`fa fa-close ${styles.floatRight} ${styles.pointer}`} onClick={() => deleteFriend(friend._id) }></i>

                    </li>) : null}

            </div>
            </div>
        </div>
    );
};


const stateToPropertyMapper = (state) => ({
    user: state.userReducer.user,
    expired: state.userReducer.expired,
    rest: state.userReducer.rest,

});

const propertyToDispatchMapper = (dispatch) => ({
    reconnect: (user) => dispatch({type: "CONNECT", user: user, rest: user.rest, expired: user.expired}),
    logout: () => dispatch({type: "LOGOUT"})

});


export default connect(stateToPropertyMapper, propertyToDispatchMapper)(withRouter(Friends));
