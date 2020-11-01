import './App.css';
import HomePageComponent from "./components/HomePage/HomePageComponent";
import React from "react";
import {Switch, Route, Redirect} from "react-router";
import ArtistComponent from "./components/ArtistPage/ArtistComponent";
import SongComponent from "./components/SongPage/SongComponent";

function App() {
    return (
        <div className="App">
            <Route exact path={"/"} component={HomePageComponent}/>
            <Route exact path={"/artist"} component={HomePageComponent}/>
            <Route exact path={"/song"} component={HomePageComponent}/>
            <Route path={"/song/:songId"}
                   render={(props) =>
                       <SongComponent
                           {...props}
                           songId = {props.match.params.songId}
                       />
                   }
            />

            <Route path={"/artist/:id"}
                   render={(props) =>
                       <ArtistComponent
                           {...props}
                           id={props.match.params.id}
                       />
                   }
            />

        </div>
    );
}

export default App;
