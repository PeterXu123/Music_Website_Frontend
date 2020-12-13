import React, {Component} from 'react';
import {searchArtist, searchSong} from "../../services/SpotifyService";
import {connect} from "react-redux";
import styles from "./HomePage.module.css"
import SearchArtistComponent from "../Results/SearchArtistComponent/SearchArtistComponent";
import SearchSongComponent from "../Results/SearchSongComponent/SearchSongComponent";
import {logout, profile} from "../../services/UserServices";
import Navbar from "../UserComponent/Navbar/Navbar";
import PopularSongComponent from "../Results/PopularSongComponent/PopularSongCompont";

class HomePageComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            op: "artist",
            searchContent: ''
        }
        this.time = '';
    }
    helper = () => {
        if (this.props.user != ''){

            clearTimeout(this.time)
            this.time = setTimeout(() => {
                logout()
                    .then((info) => {
                        console.log(info)
                        this.props.logout();
                        this.props.history.push('/login')
                    })
                    .catch(error => console.log(error))

            }, 1000 * 60 * 60)
        }



    }

    componentDidMount() {
        if (this.props.user !== '') {
            this.helper();
        } else {
            profile()
                .then(profile => {
                    console.log(profile)
                    if (profile == undefined || profile.status == 403) {
                        console.log("nothing happen")
                        clearTimeout(this.time)
                        this.props.logout();
                    } else {
                        console.log(profile)
                        console.log(profile)
                        this.props.reconnect(profile)
                        this.helper();

                    }

                })
                .catch(error => {
                    clearTimeout(this.time)
                    console.log("Wtf")
                    console.log(error)
                })

        }

    }
    componentWillUnmount() {
        clearTimeout(this.time);
    }



    
    render() {
        return (
            <div className={styles.center}>
                <Navbar></Navbar>
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
                    this.props.location.pathname !== '/song' && this.props.location.pathname !== '/artist' ?
                        <div>
                            <br/>
                            <h2>Popular</h2>
                            <PopularSongComponent/>
                        </div>
                        :null

                }
                {
                    this.props.location.pathname === '/song' && this.props.condition === 1 && <h1>{this.props.searchResult !== "" ?
                        <div>
                            <br/>
                            <h2>Result</h2>
                            <SearchSongComponent searchResult={this.props.searchResult}/>
                        </div>

                        : null}
                    </h1>
                }
                {
                    this.props.location.pathname === '/artist' && this.props.condition === 0 && <h1>{this.props.searchResult !== "" ?
                        <div>
                            <br/>
                            <h2>Result</h2>
                            <SearchArtistComponent searchResult = {this.props.searchResult}/>
                        </div>

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
    condition: state.spotifyReducer.condition,
    user: state.userReducer.user,
    expired: state.userReducer.expired,
    rest: state.userReducer.rest,
});

const propertyToDispatchMapper = (dispatch) => ({
    searchArtist: (artistName) =>
        searchArtist(artistName)
            .then(data =>
                dispatch({type: "SEARCH_ARTIST", artists: data})),

    searchSong: (songName) =>
        searchSong(songName)
            .then(data =>
                dispatch({type: "SEARCH_SONG", songs: data})),
    reconnect: (user) => dispatch({type: "CONNECT", user: user, rest: user.rest, expired: user.expired}),
    logout: () => dispatch({type: "LOGOUT"})
});


export default connect
(stateToPropertyMapper, propertyToDispatchMapper)
(HomePageComponent)
