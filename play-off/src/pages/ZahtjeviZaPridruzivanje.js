import React, { Component } from 'react'
import ZahtjevService from '../services/ZahtjevService'
import UserStore from '../stores/UserStore'
import {CheckIcon, XIcon} from '@primer/octicons-react'
import sportovi from '../config/sportovi'

export default class ZahtjeviZaPridruzivanje extends Component {

    state = {
        zahtjevi : []
    }
 
    async componentDidMount(){
        try {
            let res = await ZahtjevService.dobaviZahtjevePridruzivanje(UserStore.user.id)
            this.setState({zahtjevi: res.data})
        } catch (error) {
            throw error
        }
    }

    prihvatiZahtjev = async (zahtjev) => {
        try {
            await ZahtjevService.azurirajZahtjevPridruzivanje(zahtjev.id, {status:true}, zahtjev.posiljaoc, zahtjev.mec)
            let res2 = await ZahtjevService.dobaviZahtjevePridruzivanje(UserStore.user.id)
            this.setState({zahtjevi:res2.data})
        } catch (error) {
            throw error
        }
    }

    odbijZahtjev = async (zahtjev) => {
        try {
            await ZahtjevService.azurirajZahtjevPridruzivanje(zahtjev.id, {status:false}, zahtjev.posiljaoc, zahtjev.mec)
            let res2 = await ZahtjevService.dobaviZahtjevePridruzivanje(UserStore.user.id)
            this.setState({zahtjevi:res2.data})
        } catch (error) {
            throw error
        }
    }

    render() {
        return (
            <div>
                {this.state.zahtjevi.map(z => {
                    return (
                        <div key= {z.id} class = "card bg-light" style = {{margin:'5px'}}>
                            {"Zahtjev za prikljucivanje terminu"}<br/>
                            {sportovi.find(s=>s.id===z.sport).naziv}<br/>
                            {z.mjesto}
                            <div style = {{position:'absolute', width:'100%', paddingRight:'30px', paddingTop:'10px'}} >
                                <div style = {{ display: 'inline-block', float: 'right', width:'auto'}} hidden={z.status!=null}>
                                    <button class = "btn btn-outline-danger" style = {{marginRight:'10px'}}
                                        onClick = {() => this.odbijZahtjev(z)}>
                                        <XIcon/>Odbij
                                    </button>
                                    <button class = "btn btn-outline-success" 
                                        onClick = {() => this.prihvatiZahtjev(z)}>
                                            <CheckIcon/>Prihvati
                                    </button>
                                </div>
                                <div style = {{ display: 'inline-block', float: 'right', width:'auto'}} hidden = {z.status !== true}>
                                    <CheckIcon/>Prihvaćeno
                                </div>
                                <div style = {{ display: 'inline-block', float: 'right', width:'auto'}} hidden = {z.status !== false}>
                                    <XIcon/>Odbijeno
                                </div>
                                
                            </div>
                            
                        </div>
                    )
                })}
            </div>
        )
    }
}
