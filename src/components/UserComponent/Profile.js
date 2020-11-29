import React from "react";
import {profile} from "../../services/UserServices";

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
                <h1>Profile</h1>
                 Username: {this.state.profile.username}
            </div>
        )
    }
}
