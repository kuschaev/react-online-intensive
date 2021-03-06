// Core
import React, {Component} from 'react';
import {Link} from 'react-router-dom';

// Components
import {withProfile} from 'components/HOC/withProfile';

// Instruments
import Styles from './styles.m.css';

class Login extends Component {

    _handleLoginClick = () => {
        this.props._login();
    }

    render() {
        return (
            <section className = {Styles.login}>
                <Link to = '/feed' onClick = {this._handleLoginClick}>
                    Login
                </Link>
            </section>
        );
    }
}

export default withProfile(Login);
