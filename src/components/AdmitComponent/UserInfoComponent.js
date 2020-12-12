import React, {Component} from "react";
import {Link} from "react-router-dom";
import {removeUser} from "../../services/UserServices";

export default class UserInfoComponent extends Component {
    constructor(props) {
        super(props);
    }

    removeUser = (userId) => {
        console.log(userId)
        removeUser(userId)
            .then((res) => this.props.reload())

    }


    render() {
        console.log(this.props)
        return(
            <div className="form-group">
                <div className="row">
                    <div className="form-group col-5">
                        <Link to={`/profile/${this.props.userId}`}>
                        {this.props.username}
                        </Link>

                    </div>
                    <div className="form-group col-5"></div>
                    <div onClick={() => this.removeUser(this.props.userId)}
                        className="form-group col-2">

                        <li className="btn btn-danger">
                            Remove User
                        </li>
                    </div>
                </div>



            </div>
        )
    }
}
