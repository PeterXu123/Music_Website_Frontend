import './App.css';
import HomePageComponent from "./components/HomePage/HomePageComponent";
import React from "react";
import {Switch, Route, Redirect} from "react-router";
import ArtistComponent from "./components/ArtistPage/ArtistComponent";
import SongComponent from "./components/SongPage/SongComponent";
import AlbumComponent from "./components/AlbumComponent/AlbumComponent";
import Register from "./components/UserComponent/Register/Register";
import Profile from "./components/UserComponent/Profile/Profile";
import Login from "./components/UserComponent/Login/Login";
import ManageUserComponent from "./components/AdmitComponent/ManageUserComponent";

function App() {
    return (
        <div className="App">
            <Route exact path={"/"} component={HomePageComponent}/>
            <Route exact path={"/artist"} component={HomePageComponent}/>
            <Route exact path={"/song"} component={HomePageComponent}/>
            <Route exact path={"/register"} component = {Register}/>
            <Route exact path={"/login"} component = {Login}/>
            <Switch>
                <Route
                    path="/profile/:uid"
                    exact
                    render={(props) =>
                        <Profile
                            {...props}
                            uId = {props.match.params.uid}
                        />
                    }
                />
                <Route exact path={"/profile"} component = {Profile}/>
            </Switch>


            <Route exact path={"/manage"} component={ManageUserComponent }/>


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
            <Route path={"/album/:id"}
                   render={(props) =>
                       <AlbumComponent
                           {...props}
                           id={props.match.params.id}
                       />
                   }
            />

        </div>
    );
}

export default App;
