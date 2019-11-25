import React, { Component } from 'react';
import { get, post } from '../../util/Fetch';
import Strings from '../../strings';
import jwt from 'jsonwebtoken';
import process from 'process';
import { Post } from './Post';
import { CreatePost } from './CreatePost';

async function getPosts(instance) {
    let posts = [];

    let followers = await get(Strings.ROUTE_FOLLOWERS);
    let userPosts = [];

    for (var i = 0; i < followers.length; i++) {
        instance.setState({ followers: [...instance.state.followers, followers[i].usernames[1]] });
        console.log(followers[i].usernames[1]);
        userPosts = await get(Strings.ROUTE_POSTS + followers[i].usernames[1]);
        userPosts.forEach(userPost => posts.push(userPost));
    }

    console.log(posts);
    return posts;
}

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

    componentDidMount() {
        getPosts(this).then(posts => this.setState({posts: posts})).catch(error => console.error(error));
    }

    render() {
        return (
            <div>
                <div className="create-post-container">
                    <h1 className="create-post-title">What's on your mind?</h1>
                    <CreatePost />
                </div>
                <div className="follower-posts-container">
                    <h1 className="title">Posts from people you follow</h1>
                    {this.state.posts ? this.state.posts.map((post, index) => (
                        <div key={index}>
                            <Post post={post} instance={this} />
                        </div>
                    )) : null}
                </div>

            </div>
        );
    }
}
export default Home;