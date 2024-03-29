import React, { Component } from 'react'
import SearchKorisnici from './SearchKorisnici'
import SearchMeceviBezTimova from './SearchMeceviBezTimova'
import {Link, Switch, Route} from 'react-router-dom'

export default class SearchResults extends Component {
    render() {
        let korisnici = "/home/search/korisnici"
        let meceviBezTimova = "/home/search/meceviBezTimova"
        return (
            <div className = "page-whole">
                
                    <div class="sidebar-wrapper">
                        <nav class="navbar navbar-expand-lg navbar-light bg-light">
                            <ul class="nav flex-column">
                                <li class="nav-item">
                                    <Link class="sidebar-link" to = {korisnici}>Korisnici</Link>
                                </li>
                                <li class="nav-item">
                                    <Link class="sidebar-link" to = {meceviBezTimova}>Mečevi bez timova</Link>
                                </li>
                            </ul>                 
                        </nav>
                    </div>
                    <div class="content-wrapper">
                        <Switch>
                            <Route path = {korisnici}>
                                <SearchKorisnici query = {this.props.query} refresh = {this.props.refresh} resetRefresh = {() => this.props.resetRefresh()}/>
                            </Route>
                            <Route path = {meceviBezTimova}>
                                <SearchMeceviBezTimova query = {this.props.query}/>
                            </Route>
                        </Switch>
                    </div>
                
            </div>
        )
    }
}
