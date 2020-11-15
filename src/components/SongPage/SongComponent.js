import React, {useEffect, useState} from "react";
import {searchSongsById, getSongAudioById} from "../../services/SpotifyService";
import styles from "../ArtistPage/ArtistComponent.module.css";
import ReactAudioPlayer from 'react-audio-player';


const SongComponent = (props) => {
    const [songInfo, setSongInfo] = useState('');
    const [mp3Url, setmp3Url] = useState('');
    useEffect(() => {

        searchSongsById(props.songId)
            .then((d) => {

                console.log(d.album.images[1].url);
                console.log(d.preview_url)
                setSongInfo(d)
                setmp3Url(d.preview_url)

            });
    }, []);


    return (

        <div>
            <div className={styles.center}>
                {songInfo === '' ? null :
                    <img src={songInfo.album.images[1].url}/>}
                <h3>{songInfo.name}</h3>
                <h2>{}</h2>
                <br/>
                {
                    mp3Url === null ? null :
                        <ReactAudioPlayer
                            src= {mp3Url}
                            controls
                        />
                }

            </div>

        </div>
    )

}
export default SongComponent;
