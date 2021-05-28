import React, { Component } from 'react'
import MecService from '../services/MecService'
import UserStore from '../stores/UserStore'
import sportovi from '../config/sportovi'
import {observer} from 'mobx-react'

class Zakazano extends Component {
    state = {
        meceviBezTimova: []
    }
    async componentDidMount(){
        try {
            let rez = await MecService.dobaviTermineKorisnika(UserStore.user.id)
            this.setState({meceviBezTimova:rez.data})
        } catch (error) {
            throw error
        }
    }
    render() {
        return (
            <div>
                {this.state.meceviBezTimova.map(m=>{
                    if (m.sport !== 0)
                    return(<div id = {m.id} class = "card bg-light" style = {{margin:'5px', cursor:'pointer'}}>
                            {  
                                sportovi.find(s => s.id === m.sport).naziv
                            }<br/>
                            {m.vrijemeOdrzavanja}<br/>
                            {m.mjesto}
                        </div>)
                })}
            </div>
        )
    }
}

export default observer(Zakazano)
