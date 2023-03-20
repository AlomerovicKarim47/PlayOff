import React, { Component } from 'react'
import {Link, Route, Switch} from 'react-router-dom'
import OsnivanjeTima from './OsnivanjeTima'
import MojiTimovi from './MojiTimovi'
import '../css/Timovi.css'

export default class Timovi extends Component {
    render() {
        const mojiTimovi = "/home/timovi/mojiTimovi"
        const osnivanjeTima = "/home/timovi/osnivanje"
        return (
            <div class = "page-whole">
                
                    <div class="sidebar-wrapper">
                        <nav class="navbar navbar-expand-lg navbar-light bg-light">
                            <ul class="nav flex-column">
                                <li class="nav-item">
                                    <Link className="sidebar-link" to = {mojiTimovi}>Moji timovi</Link>
                                </li>
                                <li class="nav-item">
                                    <Link className="sidebar-link" to = {osnivanjeTima}>Osnuj tim</Link>
                                </li>       
                            </ul>                 
                        </nav>
                    </div>
                    <div class="content-wrapper">
                        <Switch>
                            <Route path = {mojiTimovi} component = {MojiTimovi}/>
                            <Route path = {osnivanjeTima} component = {OsnivanjeTima}/>
                        </Switch>
                    </div>
                
            </div>
        )
    }
}
