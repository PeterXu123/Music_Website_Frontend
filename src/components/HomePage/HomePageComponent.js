import React, {Component} from 'react';
import {searchArtist, searchSong} from "../../services/SpotifyService";
import {connect} from "react-redux";
import styles from "./HomePage.module.css"
import SearchArtistComponent from "../Results/SearchArtistComponent";
import SearchSongComponent from "../Results/SearchSongComponent";

class HomePageComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            op: "artist"
        }
    }


    render() {
        return (
            <div className={styles.center}>
                <h1>Search</h1>
                <div className={styles.center}>
                    <input className={styles.w} onChange={e => this.setState({searchContent: e.target.value})}/>
                    <button onClick={() =>{
                       if ( this.state.op === 'artist' ) {
                           this.props.history.push('/artist')
                           return this.props.searchArtist(this.state.searchContent)
                       }
                       else {
                           this.props.history.push('/song')
                           return this.props.searchSong(this.state.searchContent)
                       }
                    }}>
                        Search
                    </button>
                </div>
                <input type={'radio'} name={"op"} defaultChecked onChange={e => this.setState({op: 'artist'})}/> artist
                <input type={'radio'} name={"op"} onChange={e => this.setState({op: 'song'})}/> song

                {

                    this.props.location.pathname === '/artist' && <h1>{this.props.searchResult !== "" ? this.props.searchResult.map(artist =>
                        <SearchArtistComponent
                            key = {artist.id}
                            artistName={artist.name}
                            src={artist.images.length  != 0 ? artist.images[1].url: 'https://www.pngkit.com/png/detail/20-209584_small-anonymous-person-clip-art.png'}
                            artistId={artist.id}
                        />) : null}
                    </h1>
                }
                {
                    this.props.location.pathname === '/song' && <h1>{this.props.searchResult !== "" ? this.props.searchResult.map(song =>
                        <SearchSongComponent
                            key = {song.id}
                            songName={song.name}
                            src={song.images[1].url}
                            songId={song.id}
                        />) : null}
                    </h1>
                }

            </div>
        );
    }
}

const stateToPropertyMapper = (state) => ({
    searchResult: state.spotifyReducer.searchResult
});

const propertyToDispatchMapper = (dispatch) => ({
    searchArtist: (artistName) =>
        searchArtist(artistName)
            .then(data =>
                dispatch({type: "SEARCH_ARTIST", artists: data})),
    searchSong: (songName) =>
        searchSong(songName)
            .then(data =>
                dispatch({type: "SEARCH_SONG", songs: data}))
});


export default connect
(stateToPropertyMapper, propertyToDispatchMapper)
(HomePageComponent)
