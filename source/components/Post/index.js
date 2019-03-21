// Core
import React, { Component } from 'react';

// Instruments
import avatar from 'theme/assets/lisa';

export default class Post extends Component {
    render() {
        return (
            <section>
                <img src = {avatar} />
                <a>Lisa Simpson</a>
                <time>Now</time>
                <p>Howdy!</p>
            </section>
        );
    }
}
