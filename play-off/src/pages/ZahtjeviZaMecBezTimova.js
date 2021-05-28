import React, { Component } from 'react'
import ZahtjevService from '../services/ZahtjevService'
import UserStore from '../stores/UserStore'
import sportovi from '../config/sportovi'
import {CheckIcon, XIcon} from '@primer/octicons-react'
import {observer} from 'mobx-react'

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
            let res = await ZahtjevService.odbijZahtjevZaMecBezTimova(zahtjev.id)
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
                        <div key= {z.id} class = "card bg-light" style = {{margin:'5px'}}>
                            {sportovi.find(s=>s.id===z.sport).naziv}<br/>
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

export default observer(ZahtjeviZaMecBezTimova)