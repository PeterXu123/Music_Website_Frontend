import React, {Component} from 'react'
import { Button, Comment, Form, Header } from 'semantic-ui-react'
import './Comment.css'
import {Link} from "react-router-dom";

class CommentComponent extends Component {


    state = {
        comments: ''
    }

    deleteComment = () => {
        console.log("deleteComment")
    }



    render() {
        return (


                    <Comment>
                        <Comment.Avatar src='https://react.semantic-ui.com/images/avatar/small/matt.jpg' />
                        <Comment.Content>
                            <Comment.Author as={Link}
                                            to={"/"}>
                                Matt</Comment.Author>
                            <Comment.Metadata>
                                <div>Today at 5:42PM</div>
                            </Comment.Metadata>
                            <Comment.Text>{this.props.content}</Comment.Text>
                            <Comment.Action>
                                <button onClick ={() => this.deleteComment()} className="btn btn-danger">
                                    Delete
                                </button>
                            </Comment.Action>
                        </Comment.Content>
                    </Comment>


        )
    }
}

export default CommentComponent
