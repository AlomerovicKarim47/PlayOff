import React, { Component } from 'react'
import ZahtjevService from '../services/ZahtjevService'
import UserStore from '../stores/UserStore'
import sportovi from '../config/sportovi'
import {XIcon, CheckIcon} from '@primer/octicons-react'

export default class ZahtjeviZaTim extends Component {

    state = {
        zahtjevi:[]
    }

    async componentDidMount(){
        let res = await ZahtjevService.dobaviKorisnikoveZahtjeveZaTim(UserStore.user.id)
        this.setState({zahtjevi:res.data})
    }

    prihvatiZahtjev = async(zahtjev) => {
        try {
            let data = {
                id: zahtjev.id,
                status: true,
                tim:zahtjev.tim,
                primaoc:zahtjev.primaoc
            }
            let r = await ZahtjevService.azurirajZahtjevZaTim(data)
            console.log(r)
            let res = await ZahtjevService.dobaviKorisnikoveZahtjeveZaTim(UserStore.user.id)
            this.setState({zahtjevi:res.data})
        } catch (error) {
            throw error
        }
    }

    odbijZahtjev = async(zahtjev) => {
        try {
            let data = {
                id: zahtjev.id,
                status: false
            }
            await ZahtjevService.azurirajZahtjevZaTim(data)
            let res = await ZahtjevService.dobaviKorisnikoveZahtjeveZaTim(UserStore.user.id)
            this.setState({zahtjevi:res.data})
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
                            {z.Tim.ime}<br/>
                            {sportovi.find(s=>s.id===z.Tim.sport).naziv}<br/><br/>
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
