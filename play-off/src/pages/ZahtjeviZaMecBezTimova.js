import React, { Component } from 'react'
import ZahtjevService from '../services/ZahtjevService'
import UserStore from '../stores/UserStore'
import sportovi from '../config/sportovi'
import {observer} from 'mobx-react'
import ZahtjevMecBezTimova from '../components/ZahtjevMecBezTimova'

class ZahtjeviZaMecBezTimova extends Component {
    
    state = {
        zahtjevi:[]
    }

    async componentDidMount(){
        let res = await ZahtjevService.dobaviZahtjeveZaMecBezTimova(UserStore.user.id, null)
        this.setState({zahtjevi: JSON.parse(res.data)})
        
    }

    prihvatiZahtjev = async(zahtjev)=>{ 
        try {
            await ZahtjevService.prihvatiZahtjevZaMecBezTimova(zahtjev.id, zahtjev.primaoc, zahtjev.mec)
            //Refreshuj listu zahtjeva
            let res = await ZahtjevService.dobaviZahtjeveZaMecBezTimova(UserStore.user.id, null)
            this.setState({zahtjevi: JSON.parse(res.data)})
        } catch (error) {
            throw error
        }
    }

    odbijZahtjev = async(zahtjev)=>{
        try {
            await ZahtjevService.odbijZahtjevZaMecBezTimova(zahtjev.id)
            let res2 = await ZahtjevService.dobaviZahtjeveZaMecBezTimova(UserStore.user.id, null)
            this.setState({zahtjevi: JSON.parse(res2.data)})
        } catch (error) {
            throw error
        }
    }

    render() {
        return (
            <div>
                {this.state.zahtjevi.map(z => {
                    if (z.sport !== 0 && z.mec)
                        return (
                            <ZahtjevMecBezTimova key = {z.id} data = {{
                                sport: sportovi.find(s=>s.id===z.sport).naziv,
                                mjesto: z.mjesto,
                                vrijeme: z.vrijemeOdrzavanja,
                                zahtjev: z
                            }}
                            onPrihvati = {this.prihvatiZahtjev}
                            onOdbij = {this.odbijZahtjev}/>
                        )
                    return null
                })}
            </div>
        )
    }
}

export default observer(ZahtjeviZaMecBezTimova)