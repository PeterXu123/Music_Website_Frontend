import React, {Component} from "react";
import {Link} from "react-router-dom";
import {removeUser} from "../../services/UserServices";
import styles from "./UserInfo.module.css"
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
        <React.Fragment >
            {
                this.props.logid !== this.props.userId ?
                    <div className="list-group-item">


                                <Link to={`/profile/${this.props.userId}`}>
                                    {this.props.username}
                                </Link>





                            <div onClick={() => this.removeUser(this.props.userId)}
                                 className={`${styles.floatRight}`}>

                                <li className="btn btn-danger">
                                    Remove User
                                </li>
                            </div>
                        </div>




                    :null
            }
        </React.Fragment>


        )
    }
}
