import React, {useEffect, useState} from "react";
import {searchSongsById, getSongAudioById, searchArtist, searchSong} from "../../services/SpotifyService";
import styles from "../ArtistPage/ArtistComponent.module.css";
import ReactAudioPlayer from 'react-audio-player';
import "./SongPage.css"
import CommentComponent from "../CommentsComponent/CommentComponent/Comment";
import Navbar from "../UserComponent/Navbar/Navbar";
import {connect} from "react-redux";
import {addToFav, logout, profile, removeFav} from "../../services/UserServices";
import {addMusicOrGet} from "../../services/MusicService"


const SongComponent = (props) => {

    const [songInfo, setSongInfo] = useState('');
    const [mp3Url, setmp3Url] = useState('');
    const [user, setUser] = useState();
    let time;
    const goBack = () => {
        props.history.goBack();
    }
    const helper = () => {
        setUser(props.user)
        time = setTimeout(() => {
            logout()
                .then((info) => {
                    console.log(info)
                    props.logout();
                    props.history.push('/login')
                })
                .catch(error => console.log(error))

        }, 1000 * 60 * 60)
    }

    useEffect(() => {

        searchSongsById(props.songId)
            .then((d) => {
                console.log(props)
                setSongInfo(d)
                setmp3Url(d.preview_url)

            });


        if (props.user !== '') {
            helper();
            if (props.songId != '' && songInfo != '') {
                console.log(2222222)
                console.log(props.songId)
                addMusicOrGet(props.songId, songInfo.name)
                    .then((music) => console.log("music added or get"))
            }
        } else {
            console.log(props)
            profile()
                .then(profile => {
                    if (profile.status === 403) {
                    } else {
                        console.log(profile)
                        props.reconnect(profile)
                        helper();
                        console.log(props.songId)
                        console.log(songInfo)
                        if (props.songId != '' && songInfo != '') {
                            console.log(122222)
                            addMusicOrGet(props.songId, songInfo.name)
                                .then((music) => console.log("music added or get"))
                        }


                    }
                })
                .catch(error => {
                    console.log(error)
                    // props.history.push('/login')
                })

        }

        return () => {
            clearTimeout(time);
        }


    }, []);

    useEffect(() => {
        if (props.user !== '') {
            helper();
            if (props.songId != '' && songInfo != '') {
                console.log(2222222)
                console.log(props.songId)
                addMusicOrGet(props.songId, songInfo.name)
                    .then((music) => console.log("music added or get"))
            }
        } else {
            profile()
                .then(profile => {
                    if (profile.status === 403) {
                    } else {
                        console.log(profile)
                        props.reconnect(profile)
                        helper();
                        console.log(props.songId)
                        console.log(songInfo)
                        if (props.songId != '' && songInfo != '') {
                            console.log(props.songId)
                            console.log(songInfo)
                            addMusicOrGet(props.songId, songInfo.name)
                                .then((music) => console.log("music added or get"))
                        }


                    }
                })
                .catch(error => {
                    console.log(error)
                    // props.history.push('/login')
                })

        }


    }, [songInfo])


    const addToFavorite = (songId, username) => {
        let record = {
            songId: songId,
            username: username
        }

        addToFav(record).then(r => console.log(r));

    }

    const removeFavorite = (songId, username) => {
        let record = {
            songId: songId,
            username: username
        }
        removeFav(record).then(r => console.log(r));
    }


    return (
        <div>
            <Navbar></Navbar>
            <li className="btn" onClick={() => goBack()}>
                Back
            </li>

            <div className={styles.center}>
                {songInfo === '' ? null :
                    <img src={songInfo.album.images[1].url}/>}
                <h3>{songInfo.name}</h3>


                <div onClick={() => addToFavorite(props.songId, props.user)}>
                    <i className="empty-heart fa fa-2x fa-heart"></i>
                </div>
                <div onClick={() => removeFavorite(props.songId, props.user)}>
                    <i className="red-heart fa fa-2x fa-heart"></i>
                </div>
                <br/>

                {
                    mp3Url === null ? null :
                        <ReactAudioPlayer
                            src={mp3Url}
                            controls controlsList="nodownload"
                        />
                }


            </div>
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                <br/>
                <CommentComponent/>
            </div>
        </div>
    )

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


export default connect
(stateToPropertyMapper, propertyToDispatchMapper)
(SongComponent)


