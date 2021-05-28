import React, { Component } from 'react'
import {Link, Route, Switch} from 'react-router-dom'

import Organizuj from './Organizuj'
import Zakazano from './Zakazano'
import MojiDogadjaji from './MojiDogadjaji'
import MojDogadjaj from './MojDogadjaj'

export default class Organizacija extends Component {
    render() {
        let organizuj = "/home/organizacija/organizuj"
        let mojiDogadjaji = "/home/organizacija/mojiDogadjaji"
        let zakazano = "/home/organizacija/zakazano"
        return (
            <div class = "container-fluid no-padding">
                <div class = "row">
                    <div class="col-sm-2">
                        <nav class="navbar navbar-expand-lg navbar-light bg-light">
                            <ul class="nav flex-column">
                                <li class="nav-item">
                                    <Link class="nav-link text-dark" to = {organizuj}>Organizuj</Link>
                                </li>
                                <li class="nav-item">
                                    <Link class="nav-link text-dark" to = {mojiDogadjaji}>Moji događaji</Link>
                                </li>
                                <li class="nav-item">
                                    <Link class="nav-link text-dark" to = {zakazano}>Zakazano</Link>
                                </li>
                            </ul>                 
                        </nav>
                    </div>
                    <div class="col-sm-10">
                        <Switch>
                            <Route path = {organizuj} component = {Organizuj}/>
                            <Route path = {mojiDogadjaji} component = {MojiDogadjaji}/>
                            <Route path = {zakazano} component = {Zakazano}/>
                        </Switch>
                    </div>
                </div>
            </div>
        )
    }
}

