import React, {useEffect, useState} from 'react';
import {searchSongsForAlbum} from "../../services/SpotifyService";
import styles from './AlbumComponent.module.css'
import {Link} from "react-router-dom";
import ReactAudioPlayer from "react-audio-player";
import {addMusicToDB} from "../../services/MusicService";
const AlbumComponent = (props) => {
    const [songs, setSongs] = useState([]);

    useEffect(() => {
        console.log("Album component")
        // console.log(props.location.state.imgurl.images)
        console.log(props.location.state.imgurl)
        console.log(props.id)
        searchSongsForAlbum(props.id)
            .then((albumData) => {
                console.log(albumData)
                setSongs(albumData.items);
            })

    }, [])


    const addMusic = (songId) => {
        //console.log(songId)
        addMusicToDB(songId).then(r => console.log(r));

    }

    return (
        <div>
            <div className={`${styles.center}`}>
            <img  width={'400'} height={'400'} src={props.location.state.imgurl.length !=0 ? props.location.state.imgurl[0].url :
                'https://image.shutterstock.com/image-illustration/3d-illustration-musical-notes-signs-260nw-761313844.jpg'}></img>
            </div>
            <div className='list-group'>
                {songs.map(song =>  <div className='list-group-item'>
                        <div onClick={() => addMusic(song.id)}>
                            <Link to={`/song/${song.id}`}>
                                {song.name}
                            </Link>
                        </div>
                    <ReactAudioPlayer className={`${styles.right}`}
                        src= {song.preview_url}
                                      controls controlsList="nodownload"
                    />

                </div>)

                }
            </div>

        </div>
    );
};

export default AlbumComponent;
