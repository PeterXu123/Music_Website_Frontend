import React from 'react';
import {Link} from "react-router-dom";

const SearchArtistComponent = (props) => {
    return (
        <div>
            <img src={props.src} alt="spotify image"/>
            <Link to={`/artist/${props.id}`}>
            <h3>{props.name}</h3>
            </Link>
        </div>
    );
};

export default SearchArtistComponent;
