import React, {Component} from 'react';
import {searchArtist} from "../services/SpotifyService";
import {connect} from "react-redux";

class HomePageComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchContent: '',
        }
    }

    render() {
        return (
            <div>
                <input onChange={e => this.setState({searchContent: e.target.value})}/>
                <button onClick={() => this.props.searchArtist(this.state.searchContent)}>Search</button>
                <h1>{this.props.searchResult !== "" ? this.props.searchResult.map(a => a.name) : null}</h1>
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
                dispatch({type: "SEARCH_ARTIST", artists: data}))
});


export default connect
(stateToPropertyMapper, propertyToDispatchMapper)
(HomePageComponent)
