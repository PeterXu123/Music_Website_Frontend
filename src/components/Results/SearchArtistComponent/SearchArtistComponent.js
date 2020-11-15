import React, {useEffect} from 'react';
import {Link} from "react-router-dom";
import styles from "./SearchArtistComponent.module.css"

// <SearchArtistComponent
//     key = {artist.id}
//     artistName={artist.name}
//     src={artist.images.length  != 0 ? artist.images[1].url: 'https://www.pngkit.com/png/detail/20-209584_small-anonymous-person-clip-art.png'}
//     artistId={artist.id}
// />
const SearchArtistComponent = (props) => {
    useEffect(() => {
        console.log(props.searchResult)
    }, [])

    return (
        <div className={`row ${styles.whole}`}>
            { props.searchResult.map(artist =>
                <div className={`col-xl-2 col-lg-3 col-md-4 col-sm-6 ${styles.searchArtist}`} key={artist.id}>
                    <img src={artist.images != undefined && artist.images.length  != 0 ? artist.images[1].url: 'https://www.pngkit.com/png/detail/20-209584_small-anonymous-person-clip-art.png'} alt="spotify image" width={"300"} height={"300"}/>
                    <Link to={`/artist/${artist.id}`}>
                    <h3>{artist.name}</h3>
                    </Link>
                </div>
            )}

        </div>
    );
};

export default SearchArtistComponent;
