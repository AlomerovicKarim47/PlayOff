import React, { Component } from 'react'

import {Route, Link, Switch, withRouter} from 'react-router-dom'
import Organizacija from '../pages/Organizacija'
import Timovi from '../pages/Timovi'
import Zahtjevi from '../pages/Zahtjevi'
import Profil from '../pages/Profil'
import SearchResults from './SearchResults'
import {observer} from 'mobx-react'
import UserStore from '../stores/UserStore'
import {Dropdown} from 'react-bootstrap'

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

                <div class = "container-fluid">
                    <div class = "row">
                        <div class = "col" style = {{padding:"0px"}}>
                            <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
                                <ul class="navbar-nav mr-auto">
                                    <div class = "col" style = {{fontSize:"30px", fontWeight:"bold", display:"inline-block", color:"white", width:'220px', cursor:'default'}}>
                                        ⚽PLAY OFF🏀
                                    </div>
                                    <li class="nav-item">
                                        <Link class = "nav-link" to = {organizacija+"/organizuj"}>Organizacija</Link>
                                    </li>
                                    <li class="nav-item">
                                        <Link class = "nav-link" to = {timovi+"/mojiTimovi"}>Timovi</Link>
                                    </li>
                                    <li class="nav-item">
                                        <Link class = "nav-link" to = {zahtjevi+"/mecBezTimova"}>Zahtjevi</Link>
                                    </li>
                                </ul>                            
                            </nav>
                        </div>
                        <div class = "col bg-dark" style = {{paddingTop:"5px"}}>
                            <div class="input-group">
                                <input type = "text" class = "form-control" placeholder="Traži" onChange = {(e) => this.setState({query:e.target.value})}/>
                                <div class="input-group-append">
                                    <button class="btn btn-success" type="button" onClick = {() => this.search()}>Traži</button>
                                </div>
                            </div>
                        </div>
                        <div class = "col bg-dark" style = {{paddingTop:"5px"}}>
                            <div style = {{float:'right'}}>
                            <Dropdown>
                                <Dropdown.Toggle variant="link" id="dropdown-basic" style = {{color:'white', textDecoration:'none'}}>
                                    {UserStore.user.username}
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item>
                                        <Link to = {`${profil}/${UserStore.user.id}`} style = {{textDecoration:'none', color:'black', width:'100%'}}>Moj Profil</Link>
                                    </Dropdown.Item>
                                    <Dropdown.Item onClick={()=>this.logOut()}>Odjava</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                            </div>
                        </div>
                    </div>
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
