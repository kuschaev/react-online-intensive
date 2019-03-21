// Core
import React, { Component } from 'react';

// Instruments
import avatar from 'theme/assets/lisa';

export default class App extends Component {
    render() {
        return (
            <>
                <section>
                    <img src = {avatar} />
                    <form>
                        <textarea placeholder = {`What's up, Lisa?`}/>
                        <input type = 'submit' value = 'Post' />
                    </form>
                </section>
                <section>
                    <img src = {avatar} />
                    <a>Lisa Simpson</a>
                    <time>Now</time>
                    <p>Howdy!</p>
                </section>
            </>
        );
    }
}
