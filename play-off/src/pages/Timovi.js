import React, { Component } from 'react'
import {Link, Route, Switch} from 'react-router-dom'
import OsnivanjeTima from './OsnivanjeTima'
import MojiTimovi from './MojiTimovi'

export default class Timovi extends Component {
    render() {
        const mojiTimovi = "/home/timovi/mojiTimovi"
        const osnivanjeTima = "/home/timovi/osnivanje"
        return (
            <div class = "container-fluid no-padding">
                <div class = "row">
                    <div class="col-sm-2">
                        <nav class="navbar navbar-expand-lg navbar-light bg-light">
                            <ul class="nav flex-column">
                                <li class="nav-item">
                                    <Link class="nav-link text-dark" to = {mojiTimovi}>Moji timovi</Link>
                                </li>
                                <li class="nav-item">
                                    <Link class="nav-link text-dark" to = {osnivanjeTima}>Osnuj tim</Link>
                                </li>       
                            </ul>                 
                        </nav>
                    </div>
                    <div class="col-sm-10">
                        <Switch>
                            <Route path = {mojiTimovi} component = {MojiTimovi}/>
                            <Route path = {osnivanjeTima} component = {OsnivanjeTima}/>
                        </Switch>
                    </div>
                </div>
            </div>
        )
    }
}
