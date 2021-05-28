import React, { Component } from 'react'
import TimService from '../services/TimService'
import sportovi from '../config/sportovi'
import {Route, Link} from 'react-router-dom'
import MojTim from './MojTim'

export default class MojiTimovi extends Component {
    state = {
        timovi : []
    }
    async componentDidMount(){
        try {
            let res = await TimService.dobaviOsnovaneTimove()
            this.setState({timovi: res.data})
        } catch (error) {
            throw error
        }
    }
    render() {
        return (
            <div>
                <Route exact path = {`/home/timovi/mojiTimovi`}>
                    {this.state.timovi.map(m=>{
                        if (m.sport !== 0)
                        return(
                            <Link id = {m.id} to = {`/home/timovi/mojiTimovi/tim/${m.id}`} style = {{textDecoration:'none', color:'black'}}
                                onClick = {() => this.setState({odabraniTim: m})}>
                                <div id = {m.id} class = "card bg-light" style = {{margin:'5px', cursor:'pointer'}}>
                                    {m.ime}
                                    <br/>
                                    {  
                                        sportovi.find(s => s.id === m.sport).naziv
                                    }<br/>
                                </div>
                            </Link>)
                    })}
                </Route>
                <Route path = {`/home/timovi/mojiTimovi/tim/:id`} render = {({match}) => (
                    <MojTim did = {parseInt(match.params.id)} tim = {this.state.odabraniTim}/>
                )}/>
            </div>
        )
    }
}
