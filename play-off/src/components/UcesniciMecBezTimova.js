import React, { Component } from 'react'
import OrganizujStore from '../stores/OrganizujStore'
import Select from 'react-select'
import {PlusCircleIcon} from '@primer/octicons-react'
import {Collapse} from 'react-bootstrap'
import {observer} from 'mobx-react'
import KorisnikService from '../services/KorisnikService'
import ZahtjevService from '../services/ZahtjevService'
import UserStore from '../stores/UserStore'
import {resetOrganizujStore} from '../utility/resetStore'

class UcesniciMecBezTimova extends Component {

    async componentDidMount(){
        resetOrganizujStore()
        if (this.props.editing){
            let res = await ZahtjevService.dobaviZahtjeveZaMecBezTimova(null, this.props.did)
            OrganizujStore.ucesnici = JSON.parse(res.data)
        }
    }

    traziKorisnike = async (term) => {
        if (term.length < 2)
            return
        try {
            let rez = await KorisnikService.usernameSearch(term)
            
            OrganizujStore.ucesnikOpcije=JSON.parse(rez.data).map(o => {return {label:o.username, value:o}})
        } catch (error) {
            throw error
        }
    }

    posaljiZahtjev = async () => {
        let data = {
            posiljaoc: UserStore.user.id,
            primaoc: OrganizujStore.primaocUcesnik.value.id,
            mjesto: OrganizujStore.mjesto,
            vrijemeOdrzavanja: OrganizujStore.datum + " " + OrganizujStore.vrijeme,
            sport: OrganizujStore.sport,
            mec: this.props.did?this.props.did:OrganizujStore.mec
        }
        try {
            await ZahtjevService.posaljiZahtjevZaMecBezTimova(data)
            OrganizujStore.primaocUcesnik = null

            let res = await ZahtjevService.dobaviZahtjeveZaMecBezTimova(null, this.props.did?this.props.did:OrganizujStore.mec)
            OrganizujStore.ucesnici = JSON.parse(res.data)
        } catch (error) {
            throw error
        }
    }

    render() {
        return (
            <div hidden = {!OrganizujStore.kreirano && !this.props.editing}>
                Učesnici:<br/>
                <div class = "row">
                    <div style = {{cursor:'pointer', display:'inline-block',margin:'10px', width:'auto'}} onClick = {() => OrganizujStore.prikaziDodavanje=true}>
                        <div style = {{display:'inline-block'}}>
                            <PlusCircleIcon size = "medium"/>
                        </div>
                        <div style = {{display:'inline', position:'absolute', paddingTop:'5px', paddingLeft:'10px'}}>Dodaj</div>
                    </div>
                </div>
                <div class = "row">
                    <Collapse in = {OrganizujStore.prikaziDodavanje}>
                        <div>
                            <div class = "card bg-light">
                                <div>
                                    Dodaj učesnika:
                                    <button type="button" class="btn-close" aria-label="Close" style = {{display:'inline-block', float:'right'}}
                                        onClick = {() => OrganizujStore.prikaziDodavanje=false}></button>
                                    <Select
                                        components={{ DropdownIndicator:() => null, IndicatorSeparator:() => null }}
                                        placeholder = "Korisničko ime"
                                        isClearable = {true}
                                        value = {OrganizujStore.selektovaniUcesnik}
                                        options = {OrganizujStore.ucesnikOpcije}
                                        onInputChange = {(val) => {
                                            OrganizujStore.ucesnikSearch=val
                                            this.traziKorisnike(val)
                                        }}
                                        onChange = {(val) => {
                                            OrganizujStore.selektovaniUcesnik = val
                                        }}
                                    />
                                    <div>
                                        <button type = "button" class = "btn btn-success btn-sm" style = {{float:'right', width:'auto'}} disabled = {!OrganizujStore.selektovaniUcesnik}
                                            onClick = {() => {
                                                if (OrganizujStore.selektovaniUcesnik)
                                                    
                                                    //OrganizujStore.ucesnici= [...OrganizujStore.ucesnici, OrganizujStore.selektovaniUcesnik.value]
                                                    OrganizujStore.primaocUcesnik = OrganizujStore.selektovaniUcesnik
                                                    OrganizujStore.selektovaniUcesnik=null
                                                    OrganizujStore.ucesnikSearch=""
                                                    OrganizujStore.ucesnikOpcije=[]     
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
                    OrganizujStore.ucesnici.map((u) => {
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

export default observer(UcesniciMecBezTimova)