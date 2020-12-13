import React, {Component} from "react";
import {getAllUser, getRole, getUser, profile} from "../../services/UserServices";
import UserInfoComponent from "./UserInfoComponent";
import Navbar from "../UserComponent/Navbar/Navbar";


export default class ManageUserComponent extends Component {
    constructor(props) {
        super(props);
    }

    state = {
        users : [],
        userId: '',
        role: ''
    }

    componentDidMount() {
        profile()
            .then((user) => {
                if(user == undefined || user.status === 403) {
                    this.props.history.push('/login')
                }
                else {
                    this.setState(
                        {userId: user.userId})
                    console.log(user.userId)
                    getRole(user.userId).then((role) => {
                        this.setState({role: role})
                        console.log(role)
                        if(role != 'admin') {
                            this.props.history.push('/profile')
                        }
                    })
                }

            })


        this.reload();

    }

    reload = () => {
        getAllUser().then((users) =>
            this.setState({users: users}))
    }

    render() {
        return (



                    <div>
                        <h1>All Users</h1>
                        <div className="list-group">
                            {
                                this.state.users.length !== 0 ?
                                    this.state.users.map((user) =>
                                        <UserInfoComponent
                                            logid = {this.state.userId}
                                            username = {user.username}
                                            userId = {user._id}
                                            reload = {this.reload}
                                        />
                                    ):
                                    null
                            }
                        </div>


                    </div>

        )
    }
}



