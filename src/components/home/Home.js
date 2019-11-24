import React, { Component } from 'react';
import { get, post } from '../../util/Fetch';
import Strings from '../../strings';
import jwt from 'jsonwebtoken';
import process from 'process';

class Home extends Component {
    constructor() {
        super();

        this.state = {
            posts: [],
            followers: [],
            selectedPost: "",
            replyContent: ""
        };
    }

    onChange(value, _id) {
        // reset the status text.
        document.getElementById(`status_${_id}`).innerText = "";

        if (_id !== this.state.selectedPost) {
            this.setState({ selectedPost: _id });
        }

        this.setState({
            replyContent: value
        });
    }

    componentDidMount() {
        get(Strings.ROUTE_FOLLOWERS).then(followers => {
            followers.forEach(record => {
                this.setState({ followers: [...this.state.followers, record.usernames[1]] });

                get(Strings.ROUTE_POSTS + record.usernames[1]).then(userPosts => {
                    if (userPosts) this.setState({ posts: [...this.state.posts, userPosts] });
                }).catch(error => {
                    console.error(error);
                });
            });
        }).catch(error => {
            console.error(error);
        });
    }

    onRepliesClick(_id) {
        if (_id === this.state.selectedPost) {
            this.setState({ selectedPost: "" });
        } else {
            this.setState({ selectedPost: _id, replyContent: "" });
        }
    }

    onReplySubmit(_id) {
        // Change the HTML to show the new reply. This is done before it has reached the server (so the user isn't waiting for it)
        let html = document.getElementById("post-replies").innerHTML;
        let user = jwt.decode(localStorage.usertoken, process.env.SECRET_KEY).username;
        let time = new Date().getMilliseconds();
        document.getElementById("post-replies").innerHTML = html + `
        <div class="post-reply" id="${_id + user + time}">
            <div class="post-title">
                <a class="post-username" href="/user/${user}">${user}</a>
                <p class="post-date">Now</p>
            </div>
            <p>${this.state.replyContent}</p>
        </div>
        `;
        this.setState({replyContent: ""});

        post(Strings.ROUTE_REPLY + _id, {content: this.state.replyContent}).then(result => {
            document.getElementById(_id + user + time).style = "border-color: #00cc00;";
        }).catch(error => {
            // If it failed to send, remove the reply by reverting to the previous state of the post-replies div.
            // document.getElementById("post-replies").innerHTML = html;
            document.getElementById(`status_${_id}`).innerText = "Failed to submit your reply.";

            document.getElementById(_id + user + time).style = "border-color: #cc0000; color: #999999;";
        });
    }

    render() {
        return (
            <div>
                <h1 className="title">Posts from people you follow</h1>
                {this.state.posts ? this.state.posts.map((post, index) => (
                    <div className="post" key={index}>
                        <div className="post-title">
                            <a className="post-username" href={"/user/" + post.username}>{post.username}</a>
                            <p className="post-date">
                                {post.date_posted + (post.edited ? " (Edited)" : "")}
                            </p>
                        </div>
                        <div className="post-content">
                            {post.content}
                        </div>
                        <div>
                            <button onClick={this.onRepliesClick.bind(this, post._id)}>Replies</button>
                            {this.state.selectedPost === post._id ?
                                <div className="post-replies" id="post-replies">
                                    {post.replies.map((reply, key) => (
                                        <div className="post-reply" key={key}>
                                            <div className="post-title">
                                                <a className="post-username" href={"/user/" + reply.username}>{reply.username}</a>
                                                <p className="post-date">
                                                    {reply.date_posted + (reply.edited ? " (Edited)" : "")}
                                                </p>
                                            </div>
                                            <p>{reply.content}</p>
                                        </div>
                                    ))}
                                </div>
                                : null}
                        </div>

                        <div className="post-make-reply-container">
                            <input type="text" className="post-make-reply" onKeyPress={e => {if (e.key === "Enter") { this.onReplySubmit(post._id) }}} name={"reply" + index} onChange={e => this.onChange(e.target.value, post._id)} placeholder="Reply here" value={this.state.selectedPost === post._id ? this.state.replyContent : ""}/>
                            <button className="post-make-reply-button" onClick={this.onReplySubmit.bind(this, post._id)}><i className="material-icons">play_arrow</i></button>
                        </div>
                        <p id={"status_"+post._id}></p>
                    </div>
                )) : null}
            </div>
        );
    }
}
export default Home;