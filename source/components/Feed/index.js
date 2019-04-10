// Core
import React, { Component } from 'react';
import moment from 'moment';

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
import {api} from 'config/api';

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
        this._fetchPosts();
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

        this.setState({
            posts,
            fetchingPosts: false
        });
    }

    _createPost = async (comment) => {
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

    _removePost = async (id) => {
        this._setPostsFetchingState(true);

        await delay(900);

        this.setState(oldState => ({
            posts: oldState.posts.filter(post => post.id !== id)
        }));

        this._setPostsFetchingState(false);
    }

    _likePost = async (id) => {
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
            return (
                <Catcher key = {post.id} >
                    <Post
                        {...post}
                        _removePost = {this._removePost}
                        _likePost = {this._likePost}
                    />;
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
