import React, {useEffect, useState} from "react";
import {searchSongsById, getSongAudioById, searchArtist, searchSong} from "../../services/SpotifyService";
import styles from "../ArtistPage/ArtistComponent.module.css";
import ReactAudioPlayer from 'react-audio-player';
import "./SongPage.css"
import CommentComponent from "../CommentsComponent/CommentComponent/Comment";
import Navbar from "../UserComponent/Navbar/Navbar";
import {connect} from "react-redux";
import {addToFav, getUser, logout, profile, removeFav} from "../../services/UserServices";
import {addMusicOrGet} from "../../services/MusicService"
import {Button, Comment, Form, Header} from "semantic-ui-react";
import {createComment, findCommentsForSong} from "../../services/CommentsService";
import {render} from "@testing-library/react";


const SongComponent = (props) => {

    const [songInfo, setSongInfo] = useState('');
    const [mp3Url, setmp3Url] = useState('');
    const [user, setUser] = useState();
    const [comments, setComments] = useState('');
    const [commentList, setCommentList] = useState('');
    const [fav, setFav] = useState([]);


    const getFav = () => {
        getUser(props.user.userId)
            .then(s => {
                console.log(s)
                if (s == null) {
                    setFav([])
                }
                else {
                    setFav(s.favouriteMusic)
                }
            })
    }






    let time;
    const goBack = () => {
        props.history.goBack();
    }
    const helper = () => {
        getFav();
        clearTimeout(time)
        time = setTimeout(() => {
            logout()
                .then((info) => {
                    console.log(info)
                    props.logout();
                    props.history.push('/login')
                })
                .catch(error => console.log(error))

        }, 1000 * 60 * 60)
    }

    useEffect(() => {

        searchSongsById(props.songId)
            .then((d) => {
                console.log(props)
                setSongInfo(d)
                setmp3Url(d.preview_url)

            });


        if (props.user !== '') {
            helper();
            if (props.songId != '' && songInfo != '') {
                console.log(2222222)
                console.log(props.songId)
                addMusicOrGet(props.songId, songInfo.name)
                    .then((music) => console.log("music added or get"))
            }
        } else {
            console.log(props)
            profile()
                .then(profile => {
                    if ( profile == undefined || profile.status == 403) {
                        console.log("this is guest")
                    } else {
                        console.log(profile)
                        props.reconnect(profile)
                        helper();
                        console.log(props.songId)
                        console.log(songInfo)
                        if (props.songId != '' && songInfo != '') {
                            console.log(122222)
                            addMusicOrGet(props.songId, songInfo.name)
                                .then((music) => console.log("music added or get"))
                        }
                    }
                })
                .catch(error => {
                    console.log(error)
                    // props.history.push('/login')
                })

        }

        return () => {
            clearTimeout(time);
        }


    }, []);

    useEffect(() => {
        if (props.user !== '') {
            helper();
            if (props.songId != '' && songInfo != '') {
                console.log(2222222)
                console.log(props.songId)
                addMusicOrGet(props.songId, songInfo.name)
                    .then((music) => renderAllComments())

            }
        } else {
            profile()
                .then(profile => {
                    if (profile == undefined || profile.status == 403) {
                        console.log("this is guest")
                    } else {
                        console.log(profile)
                        props.reconnect(profile)
                        helper();
                        console.log(props.songId)
                        console.log(songInfo)
                        if (props.songId != '' && songInfo != '') {
                            console.log(props.songId)
                            console.log(songInfo)
                            addMusicOrGet(props.songId, songInfo.name)
                                .then((music) =>
                                    findCommentsForSong(props.songId)
                                    .then((comList) => renderAllComments()))
                        }
                    }
                })
                .catch(error => {
                    findCommentsForSong(props.songId)
                        .then((comList) => {
                            if(comList !== null) {
                                console.log(comList)
                                renderAllComments()
                                console.log(commentList.comments)
                            }

                        })
                })

        }


    }, [songInfo])







    useEffect(() => {
        console.log(commentList)
    }, [commentList])
    useEffect(() => {
        console.log(commentList)
    }, [fav])



    const addToFavorite = (songId, userId) => {
        let record = {
            songId: songId,
            userId: userId,

        }
        addToFav(record).then(r => {
            alert("added this song to favorite songs");
            helper();

        });

    }

    const removeFavorite = (songId, userId) => {
        let record = {
            songId: songId,
            userId: userId
        }
        removeFav(record).then(r => {
            helper()
            alert("remove this song from favorite songs")
        });
    }



    const renderAllComments = () => {
        findCommentsForSong(props.songId)
            .then((comList) => {
                console.log(comList)
                setCommentList(comList)
                console.log(commentList.comments)
            })
    }



    const addComment = (com) => {
        let comObj = {
            musicId: props.songId,
            userId: props.user.userId,
            username: props.user.username,
            content: com
        }
        createComment(comObj).then((com) => {
            console.log(com)
            setComments('');

            setTimeout(function () {
                renderAllComments();
            }, 100);


        })
    }

    return (
        <div>
            <Navbar></Navbar>
            <li className="btn" onClick={() => goBack()}>
                Back
            </li>

            <div className={styles.center}>
                {songInfo === '' ? null :
                    <img src={songInfo.album.images[1].url}/>}
                <h3>{songInfo.name}</h3>

                {props.user != '' ?
                    <div>
                    {fav.length != 0 && fav.filter(music => music.musicId == props.songId).length != 0 ?
                        <div onClick={() => removeFavorite(props.songId, props.user.userId)}>
                            <i className="red-heart fa fa-2x fa-heart"></i>
                        </div> :
                        <div onClick={() => addToFavorite(props.songId, props.user.userId)}>
                            <i className="empty-heart fa fa-2x fa-heart"></i>
                        </div>

                    }  </div>: null}



                <br/>

                {
                    mp3Url === null ? null :
                        <ReactAudioPlayer
                            src={mp3Url}
                            controls controlsList={ props.user == "" ? `nodownload` : 'download'}
                        />
                }


            </div>
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                <br/>
                <Comment.Group>
                    {
                        commentList !== null && commentList.length !== 0 && commentList.comments.length !== 0 ?
                        <div>
                            <Header dividing>
                                Comments
                            </Header>

                            <div className="ex1">
                                {
                                    commentList !== null && commentList.length !== 0 && commentList.comments.map(comment =>
                                        <CommentComponent
                                            key = {comment._id}
                                            content = {comment.content}
                                            username = {comment.userName}
                                            userId = {comment.userId}
                                            sessionId = {props.user.userId}
                                            commentId = {comment._id}
                                            reloadComments = {renderAllComments}
                                        />)
                                }
                            </div>
                        </div>
                            :
                            <Header  dividing>
                                No Comments
                            </Header>
                    }



                        {
                            <Form reply>
                                <textarea value = {comments}
                                          disabled={props.user === null || props.user ===  ''}

                                          placeholder= {props.user === null || props.user ===  '' ? "please login to comment" : ""}
                                          onChange={(e) => setComments(e.target.value)}/>
                                <Button
                                    disabled={props.user === null || props.user ===  ''}
                                    onClick={()=> addComment(comments)} content='Add Comments' labelPosition='left' icon='edit' primary />
                            </Form>

                        }

                </Comment.Group>
            </div>
        </div>
    )

}


const stateToPropertyMapper = (state) => ({
    user: state.userReducer.user,
    expired: state.userReducer.expired,
    rest: state.userReducer.rest,

});

const propertyToDispatchMapper = (dispatch) => ({
    reconnect: (user) => dispatch({type: "CONNECT", user: user, rest: user.rest, expired: user.expired}),
    logout: () => dispatch({type: "LOGOUT"})

});


export default connect
(stateToPropertyMapper, propertyToDispatchMapper)
(SongComponent)


