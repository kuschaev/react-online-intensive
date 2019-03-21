// Core
import React, { Component } from 'react';

// Instruments
import avatar from 'theme/assets/lisa';
import Styles from './styles.m.css';

export default class Composer extends Component {
    render() {
        return (
            <section className = {Styles.composer}>
                <img src = {avatar} />
                <form>
                    <textarea placeholder = {`What's up, Lisa?`}/>
                    <input type = 'submit' value = 'Post' />
                </form>
            </section>
        );
    }
}
