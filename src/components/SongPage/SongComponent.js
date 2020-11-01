import React, {useEffect, useState} from "react";
import {searchSongsById} from "../../services/SpotifyService";
import styles from "../ArtistPage/ArtistComponent.module.css";

const SongComponent = (props) => {
    const [songInfo, setSongInfo] = useState('');

    useEffect(() => {
        console.log("ssss")

        searchSongsById(props.songId)
            .then((d) => {
                setSongInfo(d)
            });
        return () => {
            console.log(123)
        }
    }, []);


    return (
        <div>
            <div className={styles.center}>
                {songInfo === '' ? null :
                    <img src={songInfo.images[1].url}/>}
                <h3>{songInfo.name}</h3>
            </div>
            {/*<div className={`list-group`}>*/}
            {/*    {songInfo === '' ? null : info.map(song =>*/}
            {/*        <li key={song.id} className={'list-group-item'}>*/}
            {/*            <img src={song.images[2].url}/>*/}
            {/*            {song.name}*/}
            {/*        </li>)}*/}
            {/*</div>*/}
        </div>
    )

}
export default SongComponent;
