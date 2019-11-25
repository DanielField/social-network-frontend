import React from 'react';
import Strings from '../../strings';
import { post } from '../../util/Fetch';
import jwt from 'jsonwebtoken';
import process from 'process';

function onRepliesClick(instance, _id) {
    if (_id === instance.state.selectedPost) {
        instance.setState({ selectedPost: "" });
    }
    else {
        instance.setState({ selectedPost: _id, replyContent: "" });
    };
}

function onReplySubmit(instance, _id) {
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
        <p id="content_${_id + user + time}">${instance.state.replyContent}</p>
    </div>
    `;
    instance.setState({ replyContent: "" });

    post(Strings.ROUTE_REPLY + _id, { content: instance.state.replyContent }).then(result => {
        document.getElementById(_id + user + time).style = "border-color: #00cc00;";
    }).catch(error => {
        document.getElementById(_id + user + time).style = "border-color: #cc0000; color: #999999;";

        let failedReplyContent = document.getElementById("content_" + _id + user + time).innerText;
        document.getElementById("content_" + _id + user + time).innerHTML = failedReplyContent + '<i style="color: #ff0000">&nbsp;(Failed to send!)</i>';
    });
}

function onChange(instance, value, _id) {
    if (_id !== instance.state.selectedPost) {
        instance.setState({ selectedPost: _id });
    }

    instance.setState({
        replyContent: value
    });
}

export const Post = (props) => (<div className="post">
    <div className="post-title">
        <a className="post-username" href={"/user/" + props.post.username}>{props.post.username}</a>
        <p className="post-date">
            {props.post.date_posted + (props.post.edited ? " (Edited)" : "")}
        </p>
    </div>
    <div className="post-content">
        {props.post.content}
    </div>
    <div>
        <button className="post-replies-button" tabIndex="-1" onKeyDown={e => e.preventDefault()} onClick={e => onRepliesClick(props.instance, props.post._id)}>
            Show replies
        </button>
        {props.instance.state.selectedPost === props.post._id ? <div className="post-replies" id="post-replies">
            {props.post.replies.map((reply, key) => <div className="post-reply" key={key}>
                <div className="post-title">
                    <a className="post-username" href={"/user/" + reply.username}>{reply.username}</a>
                    <p className="post-date">
                        {reply.date_posted + (reply.edited ? " (Edited)" : "")}
                    </p>
                </div>
                <p>{reply.content}</p>
            </div>)}
        </div> : null}
    </div>

    <div className="post-make-reply-container">
        <input type="text" className="post-make-reply" onKeyPress={e => {
            if (e.key === "Enter") {
                onReplySubmit(props.instance, props.post._id);
            }
        }} name={"reply" + props.key} onChange={e => onChange(props.instance, e.target.value, props.post._id)} placeholder="Reply here" value={props.instance.state.selectedPost === props.post._id ? props.instance.state.replyContent : ""} />
    </div>
</div>);
