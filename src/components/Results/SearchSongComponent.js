import React, {useEffect} from 'react';
import {Link} from "react-router-dom";
import styles from "./SearchArtistComponent/SearchArtistComponent.module.css";

const SearchSongComponent = (props) => {
    useEffect(() =>
    {
        console.log(props)
    }, [])
    return (


    <div className={`row ${styles.whole}`}>
        { props.searchResult.map(album =>
            <div className={`col-xl-2 col-lg-3 col-md-4 col-sm-6 ${styles.searchArtist}`} key={album.id}>
                <img src={album.images.length  != 0 ? album.images[1].url: 'https://www.pngkit.com/png/detail/20-209584_small-anonymous-person-clip-art.png'} alt="spotify image" width={"300"} height={"300"}/>
                <Link to={`/song/${album.id}`}>
                    <h3>{album.name}</h3>
                </Link>
            </div>
        )}

    </div>
    );
};

export default SearchSongComponent;
