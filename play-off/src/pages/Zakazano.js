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
            zakazani = [...zakazani, ...zakazani2]
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
                    if (m.tip === 2)
                    return(<div class = {m.tip===1?"card bg-light":"card" }
                                style = {{margin:'5px', cursor:'pointer', background:"#ccffcc"}}>
                                <div class = "row">
                                <div class = "col-md-auto">
                                    <img src={`data:${"image/png"};base64,${Buffer.from(m.prviTim.slika.data).toString('base64')}`} 
                                                class="rounded mx-auto d-block img-thumbnail" style = {{width:'100px', height:'100px', float:'left'}}/>      
                                </div>
                                <div class = "col" style = {{textAlign:'center'}}>
                                    {m.prviTim.ime + " - " + m.drugiTim.ime}<br/>
                                    {sportovi.find(s => s.id === m.sport).naziv}<br/>
                                    {m.vrijemeOdrzavanja}<br/>
                                    {m.mjesto}
                                </div>
                                <div class = "col-md-auto">
                                    <img src={`data:${"image/png"};base64,${Buffer.from(m.drugiTim.slika.data).toString('base64')}`} 
                                                class="rounded mx-auto d-block img-thumbnail" style = {{width:'100px', height:'100px', float:'left'}}/>      
                                </div>
                                </div>

                        </div>)
                    else if (m.tip === 1)
                    return(<div class = {m.tip===1?"card bg-light":"card" }
                                style = {{margin:'5px', cursor:'pointer', background:"#ccffcc", textAlign:'center'}}>
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
