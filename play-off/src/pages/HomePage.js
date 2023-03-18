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

import '../css/HomePage.css'

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
                <div className = "toolbar-nav">
                    <div className = "logo">
                        ⚽PLAY OFF🏀
                    </div>
                    <div className="navigation">
                        <ul>
                            <li>
                                <NavLink activeClassName='navigation-active' to = {organizacija+"/organizuj"}>Organizacija</NavLink>
                            </li>
                            <li>
                                <NavLink activeClassName='navigation-active' to = {timovi+"/mojiTimovi"}>Timovi</NavLink>
                            </li>
                            <li>
                                <NavLink activeClassName='navigation-active' to = {zahtjevi+"/mecBezTimova"}>Zahtjevi</NavLink>
                            </li>
                        </ul>
                    </div>                            
                    
                    <div className = "search-bar">
                        <input type = "text" className = "form-control" placeholder="Traži korisnike ili termine..." onChange = {(e) => this.setState({query:e.target.value})}/>
                        <button className="btn btn-success" type="button" onClick = {() => this.search()}>Traži</button>
                    </div>
                    
                    <div className = "dropdown-whole">
                        <Dropdown>
                            <Dropdown.Toggle variant="link" id="dropdown-basic" style = {{color:'white', textDecoration:'none'}}>
                                {UserStore.user.username}
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item>
                                    <Link to = {`${profil}/${UserStore.user.id}`} style = {{textDecoration:'none', color:'black'}}>Moj Profil</Link>
                                </Dropdown.Item>
                                <Dropdown.Item onClick={()=>this.logOut()}>
                                    Odjava
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>

                    <button class = "hamburger-btn" onClick={() => {
                        let nav = document.getElementsByClassName("navigation-alt")[0]
                        nav.style.display = (nav.style.display === "none")?"flex":"none"
                    
                    }}>
                        <div class = "hamburger"></div>
                    </button>    
                </div>  

                <div className="navigation-alt" onClick = {(e) => e.currentTarget.style.display = "none"}>
                        <ul>
                            <li>
                                <Link to = {organizacija+"/organizuj"}>Organizacija</Link>
                            </li>
                            <li>
                                <Link to = {timovi+"/mojiTimovi"}>Timovi</Link>
                            </li>
                            <li>
                                <Link to = {zahtjevi+"/mecBezTimova"}>Zahtjevi</Link>
                            </li>
                            <li>
                                <Link to = {`${profil}/${UserStore.user.id}`}>Moj Profil</Link>
                            </li>
                            <li>
                                <Link to = "" onClick={() => this.logOut()}>Odjava</Link>
                            </li>
                        </ul>
                    </div>

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
