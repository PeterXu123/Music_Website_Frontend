import React, {Component} from 'react';
import {searchArtist, searchSong} from "../../services/SpotifyService";
import {connect} from "react-redux";
import styles from "./HomePage.module.css"
import ArtistComponent from "../Results/ArtistComponent";

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
                    <button onClick={() => this.state.op === 'artist' ?  this.props.searchArtist(this.state.searchContent)
                    : this.props.searchSong(this.state.searchContent)}>
                        Search
                    </button>
                </div>
                <input type={'radio'} name={"op"} defaultChecked onChange={e => this.setState({op: 'artist'})}/> artist
                <input type={'radio'} name={"op"} onChange={e => this.setState({op: 'song'})}/> song

                <h1>{this.props.searchResult !== "" ? this.props.searchResult.map(artist =>
                    <ArtistComponent
                        key = {artist.id}
                        name={artist.name}
                        src={artist.images[1].url}
                    />) : null}
                </h1>
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
