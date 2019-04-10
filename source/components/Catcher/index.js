// Core
import React, {Component} from 'react';

// Instruments
import Styles from './styles.m.css';
import {object} from 'prop-types';

export default class Catcher extends Component {
    static propTypes = {
        children: object.isRequired
    }

    state = {
        error: false
    }

    componentDidCatch(error, stack) {
        console.error('ERROR: ', error);
        console.error('STACKTRACE: ', stack.componentStack);
        this.setState({
            error: true
        });
    }

    render() {
        if (this.state.error) {
            return (
                <section className = {Styles.catcher}>
                    <span>An error has occured!</span>
                    <p>Our engineers are working on it...</p>
                </section>
            );
        }
        return this.props.children;
    }
}
