import React, { Component } from 'react'
import ZahtjevService from '../services/ZahtjevService'
import UserStore from '../stores/UserStore'
import ZahtjevPridruzivanje from '../components/ZahtjevPridruzivanje'

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
                {this.state.zahtjevi.map(z => 
                    <ZahtjevPridruzivanje 
                        key = {z.id}
                        zahtjev = {z}
                        onPrihvati = {this.prihvatiZahtjev}
                        onOdbij = {this.odbijZahtjev}/>
                )}
            </div>
        )
    }
}
