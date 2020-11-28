import React from "react";
import {profile} from "../../services/UserServices";

export default class Profile extends React.Component {

    componentDidMount() {
        profile()
            .then(profile => console.log(profile))
    }

    render() {
        return(
            <div>
                <h1>Profile</h1>
            </div>
        )
    }
}
