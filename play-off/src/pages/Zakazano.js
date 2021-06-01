import React, { Component } from 'react'
import MecService from '../services/MecService'
import UserStore from '../stores/UserStore'
import sportovi from '../config/sportovi'
import {observer} from 'mobx-react'
import moment from 'moment'

class Zakazano extends Component {
    state = {
        meceviBezTimova: []
    }
    async componentDidMount(){
        try {
            let rez = await MecService.dobaviTermineKorisnika(UserStore.user.id)
            let zakazani = rez.data.map(r => {return {...r, tip: 1}})
            let rez2 = await MecService.dobaviMeceveKorisnika()
            let zakazani2 = rez2.data.map(r => {return {...r, tip:2}})
            
            zakazani = [...zakazani, ...zakazani2].sort((a, b) => moment(a).isBefore(moment(b)))
            this.setState({meceviBezTimova:zakazani})
        } catch (error) {
            throw error
        }
    }
    render() {
        return (
            <div>
                {this.state.meceviBezTimova.map(m=>{
                    if (m.sport !== 0)
                    return(<div class = {m.tip===1?"card bg-light":"card" }
                                style = {{margin:'5px', cursor:'pointer', background:"#ccffcc"}}>
                                {m.tip === 2?m.prviTim.ime + " - " + m.drugiTim.ime:null}<br hidden={m.tip !== 2}/>
                                {sportovi.find(s => s.id === m.sport).naziv}<br/>
                                {m.vrijemeOdrzavanja}<br/>
                                {m.mjesto}

                        </div>)
                })}
            </div>
        )
    }
}

export default observer(Zakazano)
