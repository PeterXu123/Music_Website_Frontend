import React, {useEffect} from 'react';
import {Link} from "react-router-dom";
import styles from "./SearchArtistComponent/SearchArtistComponent.module.css";

const SearchSongComponent = (props) => {
    useEffect(() =>
    {
        console.log("here")
        console.log(props.searchResult)
    }, [])
    return (
    <div className={`row ${styles.whole}`} onClick={console.log(props.searchResult)}>
        {props.searchResult.length !== 0 && props.searchResult.map(song =>
            <div className={`col-xl-2 col-lg-3 col-md-4 col-sm-6 ${styles.searchArtist}`} key={song.id}>
                <img src={song.album.images != undefined && song.album.images.length  != 0 ? song.album.images[1].url: 'https://www.pngkit.com/png/detail/20-209584_small-anonymous-person-clip-art.png'} alt="spotify image" width={"300"} height={"300"}/>
                <Link to={`/song/${song.id}`}>
                    <h3>{song.name}</h3>
                </Link>
            </div>
        )}

    </div>
    );
};

export default SearchSongComponent;
