// Core
import React, { Component } from 'react';
import moment from 'moment';
import {func, array, string, number} from 'prop-types';

// Components
import Like from 'components/Like';
import {withProfile} from 'components/HOC/withProfile';

// Instruments
import Styles from './styles.m.css';

@withProfile
export default class Post extends Component {
    static propTypes = {
        id: string.isRequired,
        comment: string.isRequired,
        created: number.isRequired,
        likes: array.isRequired,
        _likePost: func.isRequired,
        _removePost: func.isRequired
    };

    _removePost = () => {
        const {id, _removePost} = this.props;
        _removePost(id);
    }

    _getCross = () => {
        const {firstName, lastName,
            currentUserFirstName, currentUserLastName} = this.props;

        return `${firstName} ${lastName}` === `${currentUserFirstName} ${currentUserLastName}`
            ? <span className = {Styles.cross} onClick = {this._removePost}/>
            : null
    }

    render() {
        const {id, comment, created, likes, _likePost,
            avatar, firstName, lastName} = this.props;
        const cross = this._getCross();

        return (
            <section className = {Styles.post}>
                {cross}
                <img src = {avatar} />
                <a>{firstName} {lastName}</a>
                <time>{moment(created).format('MMMM D h:mm:ss a')}</time>
                <p>{comment}</p>
                <Like
                    _likePost = {_likePost}
                    id = {id}
                    likes = {likes}
                />
            </section>
        );
    }
}
