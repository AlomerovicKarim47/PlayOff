import React, { Component } from 'react'
import OsnivanjeStore from '../stores/OsnivanjeStore'
import Select from 'react-select'
import {PlusCircleIcon, XIcon, CheckIcon, ClockIcon} from '@primer/octicons-react'
import {Collapse} from 'react-bootstrap'
import {observer} from 'mobx-react'
import KorisnikService from '../services/KorisnikService'
import ZahtjevService from '../services/ZahtjevService'
import UserStore from '../stores/UserStore'
import {resetOsnivanjeStore} from '../utility/resetStore'
import { Buffer } from 'buffer'

class ClanoviTima extends Component {

    async componentDidMount(){
        resetOsnivanjeStore()
        if (this.props.editing){
            let res = await ZahtjevService.dobaviZahtjeveZaClanstvoTima(this.props.did)
            OsnivanjeStore.ucesnici = res.data
        }
    }

    traziKorisnike = async (term) => {
        if (term.length < 2)
            return
        try {
            let rez = await KorisnikService.usernameSearch(term)
            
            OsnivanjeStore.ucesnikOpcije=JSON.parse(rez.data).map(o => {return {label:o.username, value:o}})
        } catch (error) {
            throw error
        }
    }

    posaljiZahtjev = async () => {
        let data = {
            posiljaocID: UserStore.user.id,
            primaocID: OsnivanjeStore.primaocUcesnik.value.id,
            timID: this.props.did?this.props.did:OsnivanjeStore.tim,
            sadrzaj: "Zdravo, prikljuci se nasem timu."
        }
        try {
            let res = await ZahtjevService.posaljiZahtjevZaClanstvo(data)
            console.log(res)
            OsnivanjeStore.primaocUcesnik = null

            let res2 = await ZahtjevService.dobaviZahtjeveZaClanstvoTima(this.props.did?this.props.did:OsnivanjeStore.tim)
            console.log(res2)
            OsnivanjeStore.ucesnici = res2.data
        } catch (error) {
            throw error
        }
    }

    render() {
        return (
            <div hidden = {!OsnivanjeStore.kreirano && !this.props.editing}>
                Članovi:<br/>
                <div class = "row">
                    <div style = {{cursor:'pointer', display:'inline-block',margin:'10px', width:'auto'}} onClick = {() => OsnivanjeStore.prikaziDodavanje=true}>
                        <div style = {{display:'inline-block'}}>
                            <PlusCircleIcon size = "medium"/>
                        </div>
                        <div style = {{display:'inline', position:'absolute', paddingTop:'5px', paddingLeft:'10px'}}>Dodaj</div>
                    </div>
                </div>
                <div class = "row">
                    <Collapse in = {OsnivanjeStore.prikaziDodavanje}>
                        <div>
                            <div class = "card bg-light">
                                <div>
                                    Dodaj člana:
                                    <button type="button" class="btn-close" aria-label="Close" style = {{display:'inline-block', float:'right'}}
                                        onClick = {() => OsnivanjeStore.prikaziDodavanje=false}></button>
                                    <Select
                                        components={{ DropdownIndicator:() => null, IndicatorSeparator:() => null }}
                                        placeholder = "Korisničko ime"
                                        isClearable = {true}
                                        value = {OsnivanjeStore.selektovaniUcesnik}
                                        options = {OsnivanjeStore.ucesnikOpcije}
                                        onInputChange = {(val) => {
                                            OsnivanjeStore.ucesnikSearch=val
                                            this.traziKorisnike(val)
                                        }}
                                        onChange = {(val) => {
                                            OsnivanjeStore.selektovaniUcesnik = val
                                        }}
                                    />
                                    <div>
                                        <button type = "button" class = "btn btn-success btn-sm" style = {{float:'right', width:'auto'}} disabled = {!OsnivanjeStore.selektovaniUcesnik}
                                            onClick = {() => {
                                                if (OsnivanjeStore.selektovaniUcesnik)
                                                    
                                                    //OsnivanjeStore.ucesnici= [...OsnivanjeStore.ucesnici, OsnivanjeStore.selektovaniUcesnik.value]
                                                    OsnivanjeStore.primaocUcesnik = OsnivanjeStore.selektovaniUcesnik
                                                    OsnivanjeStore.selektovaniUcesnik=null
                                                    OsnivanjeStore.ucesnikSearch=""
                                                    OsnivanjeStore.ucesnikOpcije=[]     
                                                    this.posaljiZahtjev()                                             
                                                    }
                                                }>
                                                    Pošalji zahtjev
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Collapse>
                </div>
                <br/>
                <div class = "row" style = {{paddingLeft:'11px', paddingRight:'14px'}}>
                    {
                    OsnivanjeStore.ucesnici.map((u) => {
                        return (
                            <div class = "card bg-light" style = {{margin:'2px', textAlign:'center'}}>
                                <div class = "row">
                                    <div class = "col-md-auto">
                                        {u.Korisnik.slika?<img src={`data:${"image/png"};base64,${Buffer.from(u.Korisnik.slika.data).toString('base64')}`} 
                                                class="rounded mx-auto d-block img-thumbnail" style = {{width:'50px', height:'50px', float:'left'}}/>:null}
                                    </div>
                                    <div class = "col">{u.Korisnik.ime + " " + u.Korisnik.prezime + " (" + u.Korisnik.username + ")"}</div>
                                    <div class = "col-md-auto">
                                    {u.status===null?
                                        <div><ClockIcon/>Ceka se</div>:
                                            u.status===false?
                                        <div><XIcon/>Odbio</div>:
                                        <div><CheckIcon/>Prihvatio</div>}
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>

        )
    }
}

export default observer(ClanoviTima)