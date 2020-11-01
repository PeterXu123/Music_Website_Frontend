import React, {useEffect, useState} from 'react';
import axios from 'axios';
import styles from "./ArtistComponent.module.css"
import {searchSongsForArtist, searchArtistById} from "../../services/SpotifyService";
const ArtistComponent = (props) => {
    const [info, setInfo] = useState('')
    const [art, setArt] = useState('')
    useEffect(() => {
        console.log("here")
        searchArtistById(props.id)
            .then((d) => setArt(d))
        searchSongsForArtist(props.id)
            .then((data) => {

                setInfo(data)
            })

    }, [])

    return (
        <div>
            <div className={styles.center}>
            {art == '' ? null :
            <img src={art.images[2].url}/>}
            <h1>{art.name}</h1>
            </div>
            <div className={`list-group`}>
                {info == '' ? null : info.map(song => <li key={song.id} className={'list-group-item'}>
                    <img src={song.images[2].url}/>
                    {song.name}

                </li>)}
            </div>
        </div>
    );
};

export default ArtistComponent;
