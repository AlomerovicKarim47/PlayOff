import React, { Component } from 'react'
import MecService from '../services/MecService'
import UserStore from '../stores/UserStore'
import {observer} from 'mobx-react'
import ZakazaniDogadjaj from '../components/ZakazaniDogadjaj'

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
                {this.state.meceviBezTimova.map(m=>
                    <ZakazaniDogadjaj key = {m.id} data = {m}/>
                )}
            </div>
        )
    }
}

export default observer(Zakazano)
