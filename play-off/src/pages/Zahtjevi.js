import React, { Component } from 'react'
import {Link, Switch, Route} from 'react-router-dom'
import ZahtjeviZaMecBezTimova from './ZahtjeviZaMecBezTimova'
import ZahtjeviZaTim from './ZahtjeviZaTim'

export default class Zahtjevi extends Component {
    render() {
        let sviZahtjevi = "/home/zahtjevi/svi"
        let zahtjeviZaTim = "/home/zahtjevi/tim"
        return (
            
            <div>
                <div class = "container-fluid no-padding">
                    <div class = "row">
                        <div class="col-sm-2">
                            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                                <ul class="nav flex-column">
                                    <li class="nav-item">
                                        <Link class="nav-link text-dark" to = {`${sviZahtjevi}`} >Zahtjevi za meč bez timova</Link>
                                    </li>
                                    <li class="nav-item">
                                        <Link class="nav-link text-dark" to = {`${zahtjeviZaTim}`} >Zahtjevi za tim</Link>
                                    </li>
                                </ul>                 
                            </nav>
                        </div>
                        <div class="col-sm-10">
                            <Switch>
                                <Route path = {sviZahtjevi} component = {ZahtjeviZaMecBezTimova}/>
                                <Route path = {zahtjeviZaTim} component = {ZahtjeviZaTim}/>
                            </Switch>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
