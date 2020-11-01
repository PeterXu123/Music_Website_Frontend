import './App.css';
import HomePageComponent from "./components/HomePage/HomePageComponent";
import React from "react";
import {
    Switch,
    Route, Redirect


} from "react-router";
import ArtistComponent from "./components/Artist/ArtistComponent";

function App() {
    return (
        <div className="App">
            <Route exact path={"/"} component={HomePageComponent}/>
            <Route path={"/artist/:id"} render={(props) => <ArtistComponent {...props} id={props.match.params.id}/>}>

            </Route>
        </div>
    );
}

export default App;
