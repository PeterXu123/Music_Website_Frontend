import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {searchService} from "../services/SpotifyService";

class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchContent: '',
            searchResult: ''
        }
    }
    onSearch = () => {
        new searchService().searchArtist(this.state.searchContent)
            .then((data) => {
                console.log(data)
                this.setState({searchResult: data})
            })
    }
    render() {
        return (
            <div>
                <input onChange={e => this.setState({searchContent: e.target.value})}/>
                <button onClick={() => this.onSearch()}>Search</button>
                <h1>{this.state.searchResult !== "" ? this.state.searchResult.map(a => a.name) : null}</h1>

            </div>
        );
    }
}

HomePage.propTypes = {};
export default HomePage;
