// Core
import React, { Component } from 'react';
import {hot} from 'react-hot-loader';
import {Route, Switch, Redirect} from 'react-router-dom';

// Components
import Catcher from 'components/Catcher';
import Login from 'components/Login';
import Feed from 'components/Feed';
import Profile from 'components/Profile';
import StatusBar from 'components/StatusBar';
import {Provider} from 'components/HOC/withProfile';

// Instruments
import avatar from 'theme/assets/lisa'

const options = {
    avatar,
    currentUserFirstName: 'Николай',
    currentUserLastName: 'Кущаев',
    isLoggedIn: false
};

@hot(module)
export default class App extends Component {
    state = {
        ...options,
        _logout: this._logout
    }

    _login = () => {
        this.setState({
            isLoggedIn: true
        });
    }

    _logout = () => {
        this.setState({
            isLoggedIn: false
        });
    }

    render() {
        const {isLoggedIn} = this.state;
        return (
            <Catcher>
                <Provider value = {this.state}>
                    <StatusBar />
                    <Switch>
                        <Route
                            path = '/login'
                            render = {(props) => (
                                <Login _login = {this._login} {...props} />
                            )}/>
                        {!isLoggedIn && <Redirect to = '/login' />}
                        <Route component = {Feed} path = '/feed' />
                        <Route component = {Profile} path = '/profile' />
                        <Redirect to = '/feed' />
                    </Switch>
                </Provider>
            </Catcher>
        );
    }
}
