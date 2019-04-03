// Core
import React, { Component } from 'react';
import moment from 'moment';

// Components
import Spinner from 'components/Spinner';
import StatusBar from 'components/StatusBar';
import Composer from 'components/Composer';
import Post from 'components/Post';

// Instruments
import Styles from './styles.m.css';
import {getUniqueID} from 'instruments';

export default class Feed extends Component {
    constructor() {
        super();
        const now = Date.now();
        this.state = {
            fetchingPosts: false,
            posts: [
                {id: getUniqueID(), comment: 'Hello!', created: now},
                {id: getUniqueID(), comment: 'Hi!', created: now - 100},
                {id: getUniqueID(), comment: 'Howdy! 👋', created: now - 300}
            ]
        };
        this._createPost = this._createPost.bind(this);
    }

    _createPost(comment) {
        const post = {
            id: getUniqueID(),
            created: moment().utc(),
            comment
        };
        this.setState(({posts}) => ({
            posts: [post, ...posts]
        }));
    }

    render() {
        const {posts, fetchingPosts} = this.state;

        const postsJSX = posts.map(post => {
            return <Post key = {post.id} {...post}/>;
        });

        return (
            <section className = {Styles.feed}>
                <Spinner isSpinning = {fetchingPosts} />
                <StatusBar />
                <Composer _createPost = {this._createPost} />
                {postsJSX}
            </section>
        );
    }
}
