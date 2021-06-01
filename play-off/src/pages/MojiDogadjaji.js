import React, { Component } from 'react'
import MecService from '../services/MecService'
import UserStore from '../stores/UserStore'
import {observer} from 'mobx-react'
import sportovi from '../config/sportovi'
import {Route, Link, withRouter} from 'react-router-dom'
import MojDogadjaj from '../pages/MojDogadjaj'
import moment from 'moment'

class MojiDogadjaji extends Component {
    state = {
        dogadjaji : [],
        redirect : false,
        odabraniDogadjaj:null
    }

    async componentDidMount(){
        let res = await MecService.dobaviOrganizovaneTermineKorisnika(UserStore.user.id)
        let zakazani = JSON.parse(res.data).map(d => {return {...d, tip:1}})
        let rez2 = await MecService.dobaviMeceveKorisnika(true)

        let zakazani2 = rez2.data.map(r => {return {...r, tip:2}})
    
        zakazani = [...zakazani, ...zakazani2].sort((a, b) => moment(a).isBefore(moment(b)))

        this.setState({dogadjaji:zakazani})
    }

    render() {
        return (
            <div>
               <Route exact path = {`/home/organizacija/mojiDogadjaji`}>
                {this.state.dogadjaji.map(m=>{
                        if (m.sport !== 0)
                        return(
                        <Link key = {m.id} to = {`/home/organizacija/mojiDogadjaji/dogadjaj/${m.id}`} style = {{textDecoration:'none', color:'black'}} 
                        onClick = {() => this.setState({odabraniDogadjaj:m})}>
                            <div class = {m.tip===1?"card bg-light":"card" } style = {{margin:'5px', cursor:'pointer', background:"#ccffcc"}}>
                                {m.tip === 2?m.prviTim.ime + " - " + m.drugiTim.ime:null}<br hidden={m.tip !== 2}/>
                                {sportovi.find(s => s.id === m.sport).naziv}
                                <br/>
                                {m.vrijemeOdrzavanja}<br/>
                                {m.mjesto}
                            </div>
                        </Link>)
                    })}   
                </Route>
                <Route path = {`/home/organizacija/mojiDogadjaji/dogadjaj/:id`} render = {({match}) => (
                    <MojDogadjaj tip = {this.state.dogadjaji.find(d=>d.id===parseInt(match.params.id)).tip} did = {parseInt(match.params.id)} dogadjaj = {this.state.odabraniDogadjaj}/>
                )}/>   
            </div>
        )
    }
}

export default observer(withRouter(MojiDogadjaji))
