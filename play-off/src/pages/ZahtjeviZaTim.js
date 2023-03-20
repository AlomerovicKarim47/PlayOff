import React, { Component } from 'react'
import ZahtjevService from '../services/ZahtjevService'
import UserStore from '../stores/UserStore'
import ZahtjevTim from '../components/ZahtjevTim'

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
                {this.state.zahtjevi.map(z => 
                    <ZahtjevTim
                        key = {z.id}
                        zahtjev = {z}
                        onPrihvati = {this.prihvatiZahtjev}
                        onOdbij = {this.odbijZahtjev}
                    />
                )}
            </div>
        )
    }
}
