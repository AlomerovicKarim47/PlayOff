import React, { Component } from 'react'
import {Link, Route, Switch} from 'react-router-dom'

import Organizuj from './Organizuj'
import Zakazano from './Zakazano'
import MojiDogadjaji from './MojiDogadjaji'
import '../css/Organizacija.css'

export default class Organizacija extends Component {
    render() {
        let organizuj = "/home/organizacija/organizuj"
        let mojiDogadjaji = "/home/organizacija/mojiDogadjaji"
        let zakazano = "/home/organizacija/zakazano"
        return (
            <div className = "page-whole">
                <div className = "sidebar-wrapper">
                    <nav className="navbar navbar-expand-lg navbar-light bg-light">
                        <ul className="nav flex-column">
                            <li className="nav-item">
                                <Link className="sidebar-link" to = {organizuj}>Organizuj</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="sidebar-link" to = {mojiDogadjaji}>Moji događaji</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="sidebar-link" to = {zakazano}>Zakazano</Link>
                            </li>
                        </ul>                 
                    </nav>
                </div>

                <div className="content-wrapper">
                    <Switch>
                        <Route path = {organizuj} component = {Organizuj}/>
                        <Route path = {mojiDogadjaji} component = {MojiDogadjaji}/>
                        <Route path = {zakazano} component = {Zakazano}/>
                    </Switch>
                </div>   
            </div>
        )
    }
}

