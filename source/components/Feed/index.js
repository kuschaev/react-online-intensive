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
import {getUniqueID, delay} from 'instruments';

export default class Feed extends Component {
    constructor() {
        super();
        const now = Date.now();
        this.state = {
            fetchingPosts: false,
            posts: [
                {
                    id: getUniqueID(),
                    comment: 'Hello!',
                    created: now,
                    likes: []
                }, {
                    id: getUniqueID(),
                    comment: 'Hi!',
                    created: now - 100,
                    likes: []
                }, {
                    id: getUniqueID(),
                    comment: 'Howdy! 👋',
                    created: now - 300,
                    likes: []
                }
            ]
        };
        this._createPost = this._createPost.bind(this);
        this._removePost = this._removePost.bind(this);
        this._likePost = this._likePost.bind(this);
        this._setPostsFetchingState = this._setPostsFetchingState.bind(this);
    }

    _setPostsFetchingState(state) {
        this.setState({
            fetchingPosts: state
        });
    }

    async _createPost(comment) {
        this._setPostsFetchingState(true);
        const post = {
            id: getUniqueID(),
            created: moment.now(),
            comment,
            likes: []
        };

        await delay(1200);

        this.setState(({posts}) => ({
            posts: [post, ...posts]
        }));
        this._setPostsFetchingState(false);
    }

    async _removePost(id) {
        this._setPostsFetchingState(true);

        await delay(900);

        this.setState(oldState => {
            return {
                posts: oldState.posts.filter(post => post.id !== id)
            };
        });

        this._setPostsFetchingState(false);
    }

    async _likePost(id) {
        const  {currentUserFirstName, currentUserLastName} = this.props;
        this._setPostsFetchingState(true);

        await delay(1000);

        const newPosts = this.state.posts.map(post => {
            if (post.id === id) {
                return {
                    ...post,
                    likes: [{
                        id: getUniqueID(),
                        firstName: currentUserFirstName,
                        lastName: currentUserLastName
                    }]
                };
            }
            return post;
        });
        this.setState({
            posts: newPosts
        });

        this._setPostsFetchingState(false);
    }

    render() {
        const {posts, fetchingPosts} = this.state;

        const postsJSX = posts.map(post => {
            return <Post
                        key = {post.id}
                        {...post}
                        _removePost = {this._removePost}
                        _likePost = {this._likePost}
                    />;
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
