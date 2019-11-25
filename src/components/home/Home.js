import React, { Component } from 'react';
import { get, post } from '../../util/Fetch';
import Strings from '../../strings';
import jwt from 'jsonwebtoken';
import process from 'process';
import { Post } from './Post';


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

    render() {
        return (
            <div>
                <h1 className="title">Posts from people you follow</h1>
                {this.state.posts ? this.state.posts.map((post, index) => (
                    <Post key={index} post={post} instance={this} />
                )) : null}
            </div>
        );
    }
}
export default Home;