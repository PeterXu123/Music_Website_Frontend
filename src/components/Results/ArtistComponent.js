import React from 'react';

const ArtistComponent = (props) => {
    return (
        <div>
            <img src={props.src} alt="spotify image"/>
            <h3>{props.name}</h3>
        </div>
    );
};

export default ArtistComponent;
