// Core
import React, { Component } from 'react';

// Components
import Spinner from 'components/Spinner';
import StatusBar from 'components/StatusBar';
import Composer from 'components/Composer';
import Post from 'components/Post';

// Instruments
import Styles from './styles.m.css';

export default class Feed extends Component {
    constructor() {
        super();
        const now = Date.now();
        this.state = {
            posts: [
                {id: '123', comment: 'Hello!', created: now},
                {id: '456', comment: 'Hi!', created: now - 100},
                {id: '789', comment: 'Howdy! 👋', created: now - 300}
            ]
        };
    }

    render() {
        const {posts} = this.state;
        const postsJSX = posts.map(post => {
            return <Post key = {post.id} {...post}/>;
        });
        
        return (
            <section className = {Styles.feed}>
                <Spinner isSpinning />
                <StatusBar />
                <Composer />
                {postsJSX}
            </section>
        );
    }
}
