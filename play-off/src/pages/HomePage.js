import React, { Component } from 'react'

import {Route, NavLink, Link, Switch, withRouter} from 'react-router-dom'
import Organizacija from '../pages/Organizacija'
import Timovi from '../pages/Timovi'
import Zahtjevi from '../pages/Zahtjevi'
import Profil from '../pages/Profil'
import SearchResults from './SearchResults'
import {observer} from 'mobx-react'
import UserStore from '../stores/UserStore'
import {Dropdown} from 'react-bootstrap'
import Toolbar from '../components/Toolbar'

import '../css/Homepage.css'

class HomePage extends Component {

    state = {
        query : "",
        refresh: false
    }

    logOut = () => {
        this.props.history.push("/")
        UserStore.token = null
        UserStore.user = null
    }

    search = async () => {
        this.setState({refresh:true})
        this.props.history.push("/home/search/korisnici")
    }

    resetRefresh = () => {
        this.setState({refresh:false})
    }

    render() {
        let organizacija = '/home/organizacija'
        let timovi = '/home/timovi'
        let zahtjevi = '/home/zahtjevi'
        let profil = '/home/profil'
        let search = '/home/search'
        return (
            <div>
                
                <Toolbar search = {this.search} logOut = {this.logOut} onChangeSearch = {(value) => this.setState({query:value})}/>

                <Switch>
                    <Route path = {organizacija} component = {Organizacija}/>
                    <Route path = {timovi} component = {Timovi}/>
                    <Route path = {zahtjevi} component = {Zahtjevi}/>
                    <Route path = {profil+"/:id"} component = {Profil}/>
                    <Route path = {search}>
                        <SearchResults query = {this.state.query} refresh = {this.state.refresh} resetRefresh = {() => this.resetRefresh()}/>
                    </Route>
                </Switch>

            </div>
        )
    }
}

export default observer(withRouter(HomePage))
