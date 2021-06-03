import React, { Component } from 'react'
import Select from 'react-select'
import {observer} from 'mobx-react'
import ZahtjevService from '../services/ZahtjevService'
import UserStore from '../stores/UserStore'
import TimService from '../services/TimService'
import OrganizujStore from '../stores/OrganizujStore'

class BiranjeTima extends Component {
    state = {
        selektovaniUcesnik:null,
        ucesnici:[],
        ucesnikOpcije:[],
        //prikaziDodavanje:false,
        ucesnikSearch:"",
        kreirano: false,
        primaocUcesnik: null,
        //mec:null,
        mjesto:"",
        vrijeme: "",
        datum: new Date(),
        sport:0
    }

    async componentDidMount(){
        /*resetOsnivanjeStore()
        if (this.props.editing){
            let res = await ZahtjevService.dobaviZahtjeveZaClanstvoTima(this.props.did)
            this.state.ucesnici = res.data
        }*/
    }

    traziKorisnike = async (term) => {
        if (term.length < 2)
            return
        try {
            let rez = []
            if (!this.props.protivnik)
                rez = await TimService.dobaviOsnovaneTimove(term, OrganizujStore.sport)
            else
                rez = await TimService.dobaviTimove(term, OrganizujStore.sport, UserStore.user.id)
            this.setState({ucesnikOpcije:rez.data.map(o => {return {label:o.ime, value:o}})})
        } catch (error) {
            throw error
        }
    }

    posaljiZahtjev = async () => {
        let data = {
            posiljaocID: UserStore.user.id,
            primaocID: this.state.primaocUcesnik.value.id,
            timID: this.props.did?this.props.did:this.state.tim,
            sadrzaj: "Zdravo, prikljuci se nasem timu."
        }
        try {
            let res = await ZahtjevService.posaljiZahtjevZaClanstvo(data)
            console.log(res)
            this.setState({primaocUcesnik : null})

            let res2 = await ZahtjevService.dobaviZahtjeveZaClanstvoTima(this.props.did?this.props.did:this.state.tim)
            this.setState({ucesnici : res2.data})
        } catch (error) {
            throw error
        }
    }

    render() {
        return (
            <div>
                <div class = "row">
                    
                        <div>
                            <div class = "card bg-light">
                                <div>
                                    Dodaj tim:
                                    <Select
                                        isDisabled = {this.props.disabled}
                                        components={{ DropdownIndicator:() => null, IndicatorSeparator:() => null }}
                                        placeholder = "Naziv tima"
                                        isClearable = {true}
                                        value = {this.state.selektovaniUcesnik}
                                        options = {this.state.ucesnikOpcije}
                                        onInputChange = {(val) => {
                                            this.props.onChange()
                                            this.setState({ucesnikSearch:val})
                                            this.traziKorisnike(val)
                                        }}
                                        onChange = {(val) => {
                                            if (!val) return
                                            if (this.props.tim === 1)
                                                OrganizujStore.tim1 = val.value.id
                                            else if (this.props.tim ===2)
                                                OrganizujStore.tim2 = val.value.id
                                            this.setState({selektovaniUcesnik : val})
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                   
                </div>
                <br/>
                <div class = "row" style = {{paddingLeft:'11px', paddingRight:'14px'}}>
                    {
                    this.state.ucesnici.map((u) => {
                        return (
                            <div class = "card bg-light" style = {{margin:'2px'}}>
                                <div class = "row">
                                    <div class = "col">Slika ovdje</div>
                                    <div class = "col">{u.Korisnik.ime + " " + u.Korisnik.prezime + " (" + u.Korisnik.username + ")"}</div>
                                    <div class = "col">Accepted/Rejected</div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>

        )
    }
}

export default observer(BiranjeTima)