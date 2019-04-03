// Core
import React, { Component } from 'react';
import moment from 'moment';
import {func, array, string, number} from 'prop-types';

// Components
import Like from 'components/Like';
import {Consumer} from 'components/HOC/withProfile';

// Instruments
import Styles from './styles.m.css';

export default class Post extends Component {
    static propTypes = {
        id: string.isRequired,
        comment: string.isRequired,
        created: number.isRequired,
        likes: array.isRequired,
        _likePost: func.isRequired
    };

    render() {
        const {id, comment, created, likes, _likePost} = this.props;

        return (
            <Consumer>
                {context => (
                    <section className = {Styles.post}>
                        <img src = {context.avatar} />
                        <a>{context.currentUserFirstName} {context.currentUserLastName}</a>
                        <time>{moment.unix(created).format('MMMM D h:mm:ss a')}</time>
                        <p>{comment}</p>
                        <Like
                            _likePost = {_likePost}
                            id = {id}
                            likes = {likes}
                            {...context} />
                    </section>
                )}
            </Consumer>
        );
    }
}
