import React, { Component } from 'react'
import {Link, Switch, Route} from 'react-router-dom'
import ZahtjeviZaMecBezTimova from './ZahtjeviZaMecBezTimova'
import ZahtjeviZaTim from './ZahtjeviZaTim'
import ZahtjeviZaMec from './ZahtjeviZaMec'

export default class Zahtjevi extends Component {
    render() {
        let bezTimova = "/home/zahtjevi/mecBezTimova"
        let zahtjeviZaTim = "/home/zahtjevi/tim"
        let zahtjeviZaMec = "/home/zahtjevi/mec"
        return (
            
            <div>
                <div class = "container-fluid no-padding">
                    <div class = "row">
                        <div class="col-sm-2">
                            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                                <ul class="nav flex-column">
                                    <li class="nav-item">
                                        <Link class="nav-link text-dark" to = {`${bezTimova}`} >Zahtjevi za meč bez timova</Link>
                                    </li>
                                    <li class="nav-item">
                                        <Link class="nav-link text-dark" to = {`${zahtjeviZaMec}`} >Zahtjevi za meč s timovima</Link>
                                    </li>
                                    <li class="nav-item">
                                        <Link class="nav-link text-dark" to = {`${zahtjeviZaTim}`} >Zahtjevi za tim</Link>
                                    </li>
                                </ul>                 
                            </nav>
                        </div>
                        <div class="col-sm-10">
                            <Switch>
                                <Route path = {bezTimova} component = {ZahtjeviZaMecBezTimova}/>
                                <Route path = {zahtjeviZaTim} component = {ZahtjeviZaTim}/>
                                <Route path = {zahtjeviZaMec} component = {ZahtjeviZaMec}/>
                            </Switch>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
