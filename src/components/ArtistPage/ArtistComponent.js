import React, {useEffect, useState} from 'react';
import styles from "./ArtistComponent.module.css"
import {searchAlbumsForArtist, searchArtistById} from "../../services/SpotifyService";
import {Link} from "react-router-dom";

const ArtistComponent = (props) => {
    const [info, setInfo] = useState('');
    const [art, setArt] = useState('');

    useEffect(() => {
        searchArtistById(props.id)
            .then((d) => setArt(d));
        searchAlbumsForArtist(props.id)
            .then((data) => {
                console.log(data)
                setInfo(data)
            })
    }, []);

    return (
        <div>
            <div className={styles.center}>
            {art === '' ? null :
            <img src={art.images.length != 0 ? art.images[2].url : ''}/>}
            <h1>{art.name}</h1>
            </div>
            <div className={`list-group`}>
                {info === '' ? null : info.map(album =>
                    <Link to={{
                        pathname: `/album/${album.id}`, state: {imgurl: album.images}}}>
                    <li key={album.id} className={'list-group-item'}>
                    <img src={album.images[2].url}/>
                    {album.name}
                </li>
                    </Link>

                    )}
            </div>
        </div>
    );
};

export default ArtistComponent;
