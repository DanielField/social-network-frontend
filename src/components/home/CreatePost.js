import React from "react";
import { post } from "../../util/Fetch";
import Strings from "../../strings";

var content = "";

function submitPost() {
    post(Strings.ROUTE_POSTS + "create", { content: content }).then(response => {
        alert('success');
    }).catch(error => {
        alert(error);
    });
}

export const CreatePost = () => (
    <div>
        <div className="create-post-content-container">
            <textarea onChange={e => content = e.target.value} name="post-textarea" placeholder="Write stuff here" className="create-post-content" rows="4"></textarea>
        </div>
        <div className="create-post-button-container">
            <button onClick={e => submitPost(content)} className="create-post-submit-button" tabIndex="-1">Submit</button>
        </div>
    </div>
);