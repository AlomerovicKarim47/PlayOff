import React, { Component } from 'react'
import {Link, Switch, Route} from 'react-router-dom'
import ZahtjeviZaMecBezTimova from './ZahtjeviZaMecBezTimova'
import ZahtjeviZaTim from './ZahtjeviZaTim'
import ZahtjeviZaMec from './ZahtjeviZaMec'
import ZahtjeviZaPridruzivanje from './ZahtjeviZaPridruzivanje'

export default class Zahtjevi extends Component {
    render() {
        let bezTimova = "/home/zahtjevi/mecBezTimova"
        let zahtjeviZaTim = "/home/zahtjevi/tim"
        let zahtjeviZaMec = "/home/zahtjevi/mec"
        let zahtjeviZaPridruzivanje = "/home/zahtjevi/pridruzivanje"
        return (
            
            <div>
                <div class = "page-whole">
                        <div class="sidebar-wrapper">
                            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                                <ul class="nav flex-column">
                                    <li class="nav-item">
                                        <Link className="sidebar-link" to = {`${bezTimova}`} >Meč bez timova</Link>
                                    </li>
                                    <li class="nav-item">
                                        <Link className="sidebar-link" to = {`${zahtjeviZaMec}`} >Meč s timovima</Link>
                                    </li>
                                    <li class="nav-item">
                                        <Link className="sidebar-link" to = {`${zahtjeviZaTim}`} >Tim</Link>
                                    </li>
                                    <li class="nav-item">
                                        <Link className="sidebar-link" to = {`${zahtjeviZaPridruzivanje}`} >Pridruživanje</Link>
                                    </li>
                                </ul>                 
                            </nav>
                        </div>
                        <div class="content-wrapper">
                            <Switch>
                                <Route path = {bezTimova} component = {ZahtjeviZaMecBezTimova}/>
                                <Route path = {zahtjeviZaTim} component = {ZahtjeviZaTim}/>
                                <Route path = {zahtjeviZaMec} component = {ZahtjeviZaMec}/>
                                <Route path = {zahtjeviZaPridruzivanje} component = {ZahtjeviZaPridruzivanje}/>
                            </Switch>
                        </div>
                </div>
            </div>
        )
    }
}
