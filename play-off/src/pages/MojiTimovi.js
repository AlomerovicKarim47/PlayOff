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
                            <Link key = {m.id} to = {`/home/timovi/mojiTimovi/tim/${m.id}`} style = {{textDecoration:'none', color:'black'}}
                                onClick = {() => this.setState({odabraniTim: m})}>
                                <div  class = "card bg-light" style = {{margin:'5px', cursor:'pointer'}}>
                                    <div class = "row">
                                    <div class = "col-md-auto">
                                        <img src={`data:${"image/png"};base64,${Buffer.from(m.slika.data).toString('base64')}`} 
                                            class="rounded mx-auto d-block img-thumbnail" style = {{width:'80px', height:'80px', float:'left'}}/>
                                        </div>
                                        <div class = "col">
                                            {m.ime}
                                            <br/>
                                            {  
                                                sportovi.find(s => s.id === m.sport).naziv
                                            }<br/>
                                        </div>
                                    </div>
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
