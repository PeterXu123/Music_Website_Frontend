import React, {Component} from 'react'
import { Button, Comment, Form, Header } from 'semantic-ui-react'
import './Comment.css'
import {Link} from "react-router-dom";
import {deleteComment} from "../../../services/CommentsService";

class CommentComponent extends Component {


    state = {
        comments: ''
    }

    deleteComment = (comId) => {
        console.log("deleteComment")
        console.log(comId)
        deleteComment(comId)

    }


    render() {
        return (

                    <Comment>
                        <Comment.Avatar src='https://react.semantic-ui.com/images/avatar/small/matt.jpg' />
                        <Comment.Content>
                            <Comment.Author as={Link}
                                            to={`/profile/${this.props.userId}`}>
                                {this.props.username}</Comment.Author>
                            <Comment.Metadata>
                                <div>Today at 5:42PM</div>
                            </Comment.Metadata>
                            <Comment.Text>{this.props.content}</Comment.Text>
                            <Comment.Action>


                                {
                                    this.props.sessionId !== null &&
                                    this.props.sessionId === this.props.userId ?
                                    <button onClick ={() => this.deleteComment(this.props.commentId)} className="btn btn-danger">
                                        Delete
                                    </button>
                                        :
                                        null
                                }

                            </Comment.Action>
                        </Comment.Content>
                    </Comment>


        )
    }
}

export default CommentComponent
