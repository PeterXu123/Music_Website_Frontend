import React, {useEffect, useState} from "react";
import {searchSongsById, getSongAudioById, searchArtist, searchSong} from "../../services/SpotifyService";
import styles from "../ArtistPage/ArtistComponent.module.css";
import ReactAudioPlayer from 'react-audio-player';
import "./SongPage.css"
import CommentComponent from "../CommentsComponent/CommentComponent/Comment";
import Navbar from "../UserComponent/Navbar/Navbar";
import {connect} from "react-redux";
import {addToFav, removeFav} from "../../services/UserServices";


const SongComponent = (props) => {

    const [songInfo, setSongInfo] = useState('');
    const [mp3Url, setmp3Url] = useState('');

    const goBack = () => {
        props.history.goBack();
    }
    useEffect(() => {

        searchSongsById(props.songId)
            .then((d) => {
                console.log(props)
                setSongInfo(d)
                setmp3Url(d.preview_url)

            });
    }, []);


    const addToFavorite = (songId, username) => {
        let record = {songId: songId,
            username: username}

        addToFav(record).then(r => console.log(r));

    }

    const removeFavorite = (songId, username) => {
        let record = {songId: songId,
            username: username}
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
                            src= {mp3Url}
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
    reconnect: (user) => dispatch({type: "CONNECT", user: user.username, rest: user.rest, expired: user.expired}),
    logout: () => dispatch({type: "LOGOUT"})

});


export default connect
(stateToPropertyMapper, propertyToDispatchMapper)
(SongComponent)


