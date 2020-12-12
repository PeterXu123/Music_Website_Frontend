import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import styles from "../SearchArtistComponent/SearchArtistComponent.module.css";
import {searchPopularSongs} from "../../../services/SpotifyService";

const PopularSongComponent = (props) => {
    const [songs, setSongs] = useState([]);


    useEffect(() => {
        console.log("fffff")
        searchPopularSongs().then(res => console.log(res))

    }, [])


    return (
        <div className={`row ${styles.whole}`}>
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

        </div>
    );
};

export default PopularSongComponent;
