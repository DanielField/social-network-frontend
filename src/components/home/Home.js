import React, { Component } from 'react';
import { get } from '../../util/Fetch';
import Strings from '../../strings';

class Home extends Component {
    constructor() {
        super();

        this.state = {
            posts: [],
            followers: []
        };
    }

    componentDidMount() {
        get(Strings.ROUTE_FOLLOWERS).then(followers => {
            followers.forEach(record => {
                this.setState({followers: [...this.state.followers, record.usernames[1]]});

                get(Strings.ROUTE_POSTS + record.usernames[1]).then(userPosts => {
                    if(userPosts) this.setState({posts: [...this.state.posts, userPosts]});
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
                {this.state.posts? this.state.posts.map((post, index) => (
                    <div className="post" key={index}>
                        <div className="post-title">
                            <a href={"/user/" + post.username}>{post.username}</a> {post.date_posted + (post.edited? "(Edited)": "")}
                        </div>
                        <div className="post-content">
                            {post.content}
                        </div>
                    </div>
                )) : null}
            </div>
        );
    }
}
export default Home;