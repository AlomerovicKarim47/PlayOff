import React, { Component } from 'react'
import UserStore from '../stores/UserStore'

export default class HomePage extends Component {
    render() {
        return (
            <div>
                {"Home page.\nUser data: " + JSON.stringify(UserStore.user)}
            </div>
        )
    }
}
