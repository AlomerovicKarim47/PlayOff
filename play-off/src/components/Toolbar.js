import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import UserStore from '../stores/UserStore';
import { Dropdown } from 'react-bootstrap';

class Toolbar extends Component {

    componentDidMount(){
        window.addEventListener("click", this.handleClick) 
    } 

    componentWillUnmount(){
        window.removeEventListener("click", this.handleClick)
    }

    handleClick = (e) =>   
    {
        if (e.target.className !== "hamburger" && e.target.className !== "hamburger-btn")
            document.getElementsByClassName("navigation-alt")[0].style.display = "none"
    }

    render() {
        let organizacija = '/home/organizacija'
        let timovi = '/home/timovi'
        let zahtjevi = '/home/zahtjevi'
        let profil = '/home/profil'
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
                        <input type = "text" className = "form-control" placeholder="Traži korisnike ili termine..." onChange = {(e) => this.props.onChangeSearch(e.target.value)}/>
                        <button className="btn btn-success" type="button" onClick = {() => this.props.search()}>Traži</button>
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
                                <Dropdown.Item onClick={()=>this.props.logOut()}>
                                    Odjava
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
    
                    <button className = "hamburger-btn" onClick={() => {
                        let nav = document.getElementsByClassName("navigation-alt")[0]
                        nav.style.display = (nav.style.display === "none" || !nav.style.display)?"flex":"none"
                    }}> 
                        <div className = "hamburger"></div>
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
                            <Link to = "" onClick={() => this.props.logOut()}>Odjava</Link>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}

export default Toolbar;
