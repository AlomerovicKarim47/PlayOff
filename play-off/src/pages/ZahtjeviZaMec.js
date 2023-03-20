import React, { Component } from 'react'
import sportovi from '../config/sportovi'
import ZahtjevService from '../services/ZahtjevService'
import ZahtjevMec from '../components/ZahtjevMec'

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
                        <ZahtjevMec data = {{
                                sport: sportovi.find(s=>s.id===z.sport).naziv,
                                z
                            }}
                            onOdbij = {this.odbijZahtjev}
                            onPrihvati = {this.prihvatiZahtjev}/>
                    )
                })}
            </div>
        )
    }
}
