import React from "react";
import {profile} from "../../services/UserServices";
import Navbar from "./Navbar/Navbar";

export default class Profile extends React.Component {
    state = {
        profile: {
            username: 'a'
        }
    }
    componentDidMount() {
        profile()
            .then(profile => {
                if(profile.status === 403) {
                    this.props.history.push('/login')
                }
                else {
                    console.log(profile)
                    this.setState({
                        profile: profile
                    })
                }

            })
            .catch(error => {
                console.log(error)
                this.props.history.push('/login')
            })
    }

    render() {
        return(
            <div>
                <Navbar></Navbar>
                <h1>Profile</h1>
                 Username: {this.state.profile.username}
            </div>
        )
    }
}
