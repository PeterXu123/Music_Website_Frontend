import React from 'react';
import {Link} from "react-router-dom";

const SearchSongComponent = (props) => {
    return (
        <div>
            <img src={props.src} alt="spotify image"/>
            <Link to={`/song/${props.songId}`}>
                <h3>{props.songName}</h3>
            </Link>
        </div>
    );
};

export default SearchSongComponent;
