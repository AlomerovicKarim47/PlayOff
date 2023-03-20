import React, { Component } from 'react'
import TimService from '../services/TimService'
import {Route} from 'react-router-dom'
import MojTim from './MojTim'
import MojTimItem from '../components/MojTimItem'

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
                    {this.state.timovi.map(m=>
                        <MojTimItem data = {m} onClick = {() => this.setState({odabraniTim: m})}/>
                    )}
                </Route>
                <Route path = {`/home/timovi/mojiTimovi/tim/:id`} render = {({match}) => (
                    <MojTim did = {parseInt(match.params.id)} tim = {this.state.odabraniTim}/>
                )}/>
            </div>
        )
    }
}
