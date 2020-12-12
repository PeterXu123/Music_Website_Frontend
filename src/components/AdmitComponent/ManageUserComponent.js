import {Component} from "react";
import {getAllUser} from "../../services/UserServices";
import UserInfoComponent from "./UserInfoComponent";

export default class ManageUserComponent extends Component {
    constructor(props) {
        super(props);
    }

    state = {
        users : []
    }

    componentDidMount() {
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

                {
                    this.state.users.length !== 0 ?
                        this.state.users.map((user) =>
                            <UserInfoComponent
                                username = {user.username}
                                userId = {user._id}
                                reload = {this.reload}
                            />
                        ):
                        null
                }
            </div>
        )
    }


}
