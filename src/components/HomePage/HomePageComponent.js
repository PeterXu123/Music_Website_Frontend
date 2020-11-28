import React, {Component} from 'react';
import {searchArtist, searchSong} from "../../services/SpotifyService";
import {connect} from "react-redux";
import styles from "./HomePage.module.css"
import SearchArtistComponent from "../Results/SearchArtistComponent/SearchArtistComponent";
import SearchSongComponent from "../Results/SearchSongComponent/SearchSongComponent";

class HomePageComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            op: "artist",
            searchContent: ''
        }
    }
    
    render() {
        return (
            <div className={styles.center}>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <a className="navbar-brand" href="/">Home</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse"
                            data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false"
                            aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse justify-content-end" id="navbarNavDropdown">
                        <ul className="navbar-nav">
                            <li className="nav-item active">
                                <a className="nav-link" href="/login">Login <span className="sr-only">(current)</span></a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/register">Register</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/profile">Profile</a>
                            </li>

                        </ul>
                    </div>
                </nav>
                <h1>Search</h1>
                <div className={styles.center}>
                    <input className={styles.w} onChange={e => this.setState({searchContent: e.target.value})}/>
                    <button onClick={() => {
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
                <input className={`${styles.rbutton}`} type={'radio'} name={"op"} defaultChecked onChange={e => this.setState({op: 'artist'})}/> artist
                &nbsp;
                <input className={`${styles.rbutton}`} type={'radio'} name={"op"} onChange={e => this.setState({op: 'song'})}/> song
                {
                    this.props.location.pathname === '/song' && this.props.condition === 1 && <h1>{this.props.searchResult !== "" ?
                        <SearchSongComponent searchResult={this.props.searchResult}/>
                        : null}
                    </h1>
                }
                {
                    this.props.location.pathname === '/artist' && this.props.condition === 0 && <h1>{this.props.searchResult !== "" ?
                        <SearchArtistComponent searchResult = {this.props.searchResult}/>
                        :
                        null}
                    </h1>
                }
            </div>
        );
    }
}

const stateToPropertyMapper = (state) => ({
    searchResult: state.spotifyReducer.searchResult,
    condition: state.spotifyReducer.condition
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
