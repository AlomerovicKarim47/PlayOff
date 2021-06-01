import React, { Component } from 'react'
import sportovi from '../config/sportovi'
import {XIcon, CheckIcon} from '@primer/octicons-react'
import ZahtjevService from '../services/ZahtjevService'

export default class ZahtjeviZaMec extends Component {
    state = {
        zahtjevi:[]
    }

    prihvatiZahtjev = async (zahtjev) => {
        zahtjev.status = true
        try {
            await ZahtjevService.azurirajZahtjevZaMec(zahtjev)
            let res2 = await ZahtjevService.dobaviZahtjeveZaMec()
            this.setState({zahtjevi: res2.data})
        } catch (error) {
            throw error
        }
    }

    odbijZahtjev = async (zahtjev) => {
        zahtjev.status = false
        try {
            await ZahtjevService.azurirajZahtjevZaMec(zahtjev)
            let res2 = await ZahtjevService.dobaviZahtjeveZaMec()
            this.setState({zahtjevi: res2.data})
        } catch (error) {
            throw error
        }
    }

    async componentDidMount(){
        try {
            let res = await ZahtjevService.dobaviZahtjeveZaMec()
            this.setState({zahtjevi: res.data})
        } catch (error) {
            throw error
        }
    }
    render() {
        return (
            <div>
                {this.state.zahtjevi.map(z => {
                    if (z.sport !== 0)
                    return (
                        <div key= {z.id} class = "card bg-light" style = {{margin:'5px'}}>
                            {sportovi.find(s=>s.id===z.sport).naziv}<br/>
                            {z.prviTim.ime + " - " + z.drugiTim.ime}<br/>
                            {z.mjesto}<br/>
                            {z.vrijemeOdrzavanja}
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
