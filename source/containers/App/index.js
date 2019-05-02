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
    currentUserLastName: 'Кушаев',
    isLoggedIn: false
};

@hot(module)
export default class App extends Component {
    state = {
        isLoggedIn: options.isLoggedIn
    }

    render() {
        const isLoggedIn = this.state.isLoggedIn;
        return (
            <Catcher>
                <Provider value = {options}>
                    {/*{isLoggedIn ? () : ()}*/}
                    <StatusBar />
                    <Switch>
                        <Route component = {Feed} path = '/feed' />
                        <Route component = {Profile} path = '/profile' />
                        <Route component = {Login} path = '/login' />
                        <Redirect to = '/feed' />
                    </Switch>
                </Provider>
            </Catcher>
        );
    }
}
