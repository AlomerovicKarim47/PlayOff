import React, { Component } from 'react'
import { Redirect, Route } from 'react-router'

import UserStore from '../stores/UserStore'

export default class ProtectedRoute extends Component {
    render() {
        return (
            <Route render={()=>{
                if (UserStore.token){
                    let Comp = this.props.component
                    return <Comp {...this.props}></Comp>
                }
                else
                    return <Redirect to = {{
                        pathname:"/",
                        state:{
                            from: this.props.location
                        }
                    }}/>
            }}/>
        )
    }
}
