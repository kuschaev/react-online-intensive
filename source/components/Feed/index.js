// Core
import React, { Component } from 'react';
// import moment from 'moment';

// Components
import {withProfile} from 'components/HOC/withProfile'
import Catcher from 'components/Catcher';
import Spinner from 'components/Spinner';
import StatusBar from 'components/StatusBar';
import Composer from 'components/Composer';
import Post from 'components/Post';

// Instruments
import Styles from './styles.m.css';
import {getUniqueID, delay} from 'instruments';
import {api, TOKEN, GROUP_ID} from 'config/api';
import {socket} from 'socket/init';

class Feed extends Component {
    static now = Date.now();
    state = {
        fetchingPosts: false,
        posts: [
            {
                id: getUniqueID(),
                comment: 'Hello!',
                created: Feed.now,
                likes: []
            }, {
                id: getUniqueID(),
                comment: 'Hi!',
                created: Feed.now - 90000,
                likes: []
            }, {
                id: getUniqueID(),
                comment: 'Howdy! 👋',
                created: Feed.now - 126000,
                likes: []
            }
        ]
    }

    componentDidMount() {
        const {currentUserFirstName, currentUserLastName} = this.props;
        this._fetchPosts();
        socket.emit('join', GROUP_ID);
        socket.on('create', postJSON => {
            const {data: createdPost, meta} = JSON.parse(postJSON);
            if (
                `${currentUserFirstName} ${currentUserLastName}` !==
                `${meta.authorFirstName} ${meta.authorLastName}`
            ) {
                this.setState(({posts}) => ({
                    posts: [createdPost, ...posts]
                }));
            }
        });

        socket.on('like', postJSON => {
            const {data: likedPost, meta} = JSON.parse(postJSON);
            if (
                `${currentUserFirstName} ${currentUserLastName}` !==
                `${meta.authorFirstName} ${meta.authorLastName}`
            ) {
                this.setState(({posts}) => ({
                    posts: posts.map(
                        post => post.id === likedPost.id ? likedPost : post
                    )
                }));
            }
        });

        socket.on('remove', postJSON => {
            const {data: removedPost, meta} = JSON.parse(postJSON);
            if (
                `${currentUserFirstName} ${currentUserLastName}` !==
                `${meta.authorFirstName} ${meta.authorLastName}`
            ) {
                this.setState(({posts}) => ({
                    posts: posts.filter(post => post.id !== removedPost.id)
                }));
            }
        });
    }

    componentWillUnmount() {
        socket.removeListener('create');
        socket.removeListener('remove');
        socket.removeListener('like');
    }

    _setPostsFetchingState = (state) => {
        this.setState({
            fetchingPosts: state
        });
    }

    _fetchPosts = async () => {
        this._setPostsFetchingState(true);

        const response = await fetch(api, {
            method: 'GET'
        });
        const {data: posts} = await response.json();

        this.setState({posts});

        this._setPostsFetchingState(false);
    }

    _createPost = async (comment) => {
        this._setPostsFetchingState(true);

        const response = await fetch(api, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': TOKEN
            },
            body: JSON.stringify({comment})
        });
        const {data: post} = await response.json();

        this.setState(({posts}) => ({
            posts: [post, ...posts]
        }));

        this._setPostsFetchingState(false);
    }

    _removePost = async (id) => {
        this._setPostsFetchingState(true);

        await fetch(`${api}/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': TOKEN
            }
        });

        this.setState(({posts}) => ({
            posts: posts.filter(post => post.id !== id)
        }));

        this._setPostsFetchingState(false);
    }

    _likePost = async (id) => {
        this._setPostsFetchingState(true);

        const response = await fetch(`${api}/${id}`, {
            method: 'PUT',
            headers: {
                'Authorization': TOKEN
            }
        });

        const {data: likedPost} = await response.json();

        this.setState(({posts}) => ({
            posts: posts.map(
                post => post.id === likedPost.id ? likedPost : post
            )
        }));

        this._setPostsFetchingState(false);
    }

    render() {
        const {posts, fetchingPosts} = this.state;

        const postsJSX = posts.map(post => {
            return (
                <Catcher key = {post.id} >
                    <Post
                        {...post}
                        _removePost = {this._removePost}
                        _likePost = {this._likePost}
                    />
                </Catcher>
            );
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

export default withProfile(Feed);
