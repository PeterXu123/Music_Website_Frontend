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
        deleteComment(comId)
            .then(() => this.props.reloadComments())

    }


    render() {
        return (

                    <Comment>
                        {/*https://react.semantic-ui.com/images/avatar/small/jenny.jpg*/}
                        <Comment.Avatar src={this.props.gender == 'male'  ? 'https://react.semantic-ui.com/images/avatar/small/matt.jpg' :
                            "https://react.semantic-ui.com/images/avatar/small/jenny.jpg"} />
                        <Comment.Content>

                            <Comment.Author as={Link}
                                            to={this.props.userId !== this.props.sessionId ? `/profile/${this.props.userId}` : `/profile` }>
                                {this.props.username}</Comment.Author>
                            <Comment.Metadata>
                                <div>{this.props.timestamp}</div>
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
