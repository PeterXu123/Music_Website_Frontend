import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import styles from "../SearchArtistComponent/SearchArtistComponent.module.css";
import {searchPopularSongs} from "../../../services/SpotifyService";
import Spinner from "react-bootstrap/Spinner";
import {withRouter} from "react-router";
import {connect} from "react-redux";
import {addMusicOrGet} from "../../../services/MusicService";
import {getUser, profile} from "../../../services/UserServices";
import {findCommentsForSong} from "../../../services/CommentsService";

const PopularSongComponent = (props) => {
    const [songs, setSongs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [fav, setFav] = useState([])

    useEffect(() => {
        console.log("fffff")
        setLoading(true);
        searchPopularSongs().then(res => {
            setLoading(false);
            setSongs(res.tracks)
        })
        if (props.user !== '') {
            getUser(props.user.userId)
                .then(favMusics => {
                    console.log(favMusics)
                    setFav(favMusics.favouriteMusic)
                })

        } else {
            profile()
                .then(profile => {
                    if (profile == undefined || profile.status == 403) {

                        console.log("this is guest")
                    } else {
                        console.log(profile)
                        props.reconnect(profile)
                        getUser(profile.userId)
                            .then(favMusics => {
                                console.log(favMusics)
                                setFav(favMusics.favouriteMusic)

                            })


                    }
                })
                .catch(error => {
                    console.log("error")

                })

        }




    }, [])


    return (
        <div className={`row ${styles.whole}`}>
            {loading ? <div style={{width: "100%"}}><Spinner animation="border" /></div> : <React.Fragment>
                {songs.length !== 0 && songs.map(song =>
                        <div className={`col-xl-2 col-lg-3 col-md-4 col-sm-6 ${styles.searchArtist}`} key={song.id}>
                            <img
                                src={song.album.images != undefined && song.album.images.length != 0 ? song.album.images[1].url : 'https://www.pngkit.com/png/detail/20-209584_small-anonymous-person-clip-art.png'}
                                alt="spotify image" width={"300"} height={"300"}/>
                            <Link to={`/song/${song.id}`}>
                                <h3>{song.name}</h3>
                            </Link>

                        </div>
                    )}
                {fav.length != 0 ? fav.map(m =>

                        <div className={`col-xl-2 col-lg-3 col-md-4 col-sm-6 ${styles.searchArtist}`} key={m.musicId}>
                            <img
                                src={'https://cdn.thememylogin.com/uploads/edd/2019/03/favorites.png\n'}
                                alt="spotify image" width={"300"} height={"300"}/>
                            <Link to={`/song/${m.musicId}`}>
                                <h3>{m.title}</h3>
                            </Link>

                        </div>)
                    : null}
            </React.Fragment>

            }



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


export default connect(stateToPropertyMapper, propertyToDispatchMapper)(withRouter(PopularSongComponent));
