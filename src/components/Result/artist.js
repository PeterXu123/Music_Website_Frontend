import React from 'react';

const Artist = (props) => {
    return (
        <div>
            <img src={props.src}/>
            <h3>{props.name}</h3>

        </div>
    );
};

export default Artist;
