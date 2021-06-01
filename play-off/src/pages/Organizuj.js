import React, { Component } from 'react'
import Select from 'react-select'
import sportovi from '../config/sportovi'
import {Collapse} from 'react-bootstrap'
import {observer} from 'mobx-react'
import OrganizujStore from '../stores/OrganizujStore'
import UcesniciMecBezTimova from '../components/UcesniciMecBezTimova'
import UserStore from '../stores/UserStore'
import BiranjeTima from '../components/BiranjeTima'
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns'
import MecService from '../services/MecService'
import {resetOrganizujStore} from '../utility/resetStore'
import tipoviDogadjaja from '../config/tipoviDogadjaja'
import moment from 'moment'
import ZahtjevService from '../services/ZahtjevService'

class Organizuj extends Component {

    state = {
        biranjeTimova:false
    }

    componentWillUnmount(){
        resetOrganizujStore()
    }

    kreirajMecBezTimova = async () => {
        OrganizujStore.kreirano = true
        let data = {
            organizatorID: UserStore.user.id,
            sportID: OrganizujStore.sport,
            vrijemeOdrzavanja: `${moment(OrganizujStore.datum).format('DD/MM/YYYY')} ${OrganizujStore.vrijeme}`,
            mjesto: OrganizujStore.mjesto 
        }
        try {
            let res = await MecService.kreirajMecBezTimova(data)
            OrganizujStore.mec = (JSON.parse(res.data)).id
        } catch (error) {
            throw error
        }
        
    }

    posaljiZahtjevZaMec = async () => {
        OrganizujStore.kreirano = true
        let zahtjev = {
            sadrzaj : "Zahtjev za meč.",
            posiljaocID: OrganizujStore.tim1,
            primaocID: OrganizujStore.tim2,
            sportID: OrganizujStore.sport,
            vrijeme: `${moment(OrganizujStore.datum).format('DD/MM/YYYY')} ${OrganizujStore.vrijeme}`,
            mjesto: OrganizujStore.mjesto
        }
        try {
            let res = await ZahtjevService.posaljiZahtjevZaMec(zahtjev)    
            console.log(res)
        } catch (error) {
            throw error
        }
    }

    render() {
        const sportOpcije = sportovi.map(s => {return {label:s.naziv, value: s.id}})
        const tipoviDogadjajaOpcije = tipoviDogadjaja.map(d => {return {label: d.naziv, value:d.id}})
        return (
            <div>
                <div class = "container-fluid" style = {{padding:"20px"}}>
                    
                    <div class = "row">
                        <div class = "col-sm-1">Mjesto:</div> 
                        <div class = "col-sm-11">
                            <input type = "text" class = "form-control" placeholder = "Mjesto" disabled = {OrganizujStore.kreirano}
                                value = {OrganizujStore.mjesto}
                                onChange = {(e) => {
                                    OrganizujStore.mjesto = e.target.value}}/>
                        </div>
                    </div>

                    <div class = "row">
                        <div class = "col-sm-1">Datum:</div> 
                        <div class = "col-sm-11">
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <DatePicker
                                value = {OrganizujStore.datum}
                                disabled = {OrganizujStore.kreirano}
                                style = {{width:'100%'}}
                                format="dd/MM/yyyy"
                                onChange={date => OrganizujStore.datum = date}
                            />
                            <div className="validation-msg">{this.state.rodjendanError}</div>
                        </MuiPickersUtilsProvider>
                    </div>
                    </div>
                    
                    <div class = "row">
                        <div class = "col-sm-1">Vrijeme:</div> 
                        <div class = "col-sm-11">
                            <input type = "time" class = "form-control" disabled = {OrganizujStore.kreirano}
                                value = {OrganizujStore.vrijeme}
                                onChange = {(e) => OrganizujStore.vrijeme = e.target.value}/>
                        </div>
                    </div>

                    <div class = "row">
                        <div class = "col-sm-1">Sport:</div> 
                        <div class = "col-sm-11">
                            <Select options = {sportOpcije} className="react-select" isDisabled = {OrganizujStore.kreirano} 
                                value = {OrganizujStore.sport!==0?{value: OrganizujStore.sport, 
                                                                    label: sportovi.find(s=>s.id===OrganizujStore.sport).naziv}:null}
                                onChange = {(e) => OrganizujStore.sport = e.value}/>
                        </div>
                    </div>
                    <div class = "row">
                        <div class = "col-sm-1">Tip događaja:</div> 
                        <div class = "col-sm-11">
                            <Select options = {tipoviDogadjajaOpcije} className="react-select" isDisabled = {OrganizujStore.kreirano}
                                value = {OrganizujStore.tip}
                                onChange = {(e) => {
                                    OrganizujStore.tip = e
                                    if (e.value === 2) 
                                        this.setState({biranjeTimova:true})
                                    else
                                        this.setState({biranjeTimova:false})
                                    }}/>
                        </div>
                    </div>
                    <Collapse in = {this.state.biranjeTimova}>
                        <div class = "container-fluid">
                            Timovi:
                            <br/>
                            <div class = "row">
                                <div class = "col">
                                    <BiranjeTima tim = {1} disabled = {OrganizujStore.kreirano}/>
                                </div>
                                <div class = "col">
                                    <BiranjeTima tim = {2} protivnik = {true} disabled = {OrganizujStore.kreirano}/>
                                </div>
                            </div>
                        </div>
                    </Collapse>
                    <div class = "row">
                        <div class = "col">
                            <button 
                                style = {{width:'100%'}}
                                class = "btn btn-outline-success"
                                onClick = {() => {
                                    this.setState({biranjeTimova:false})
                                    resetOrganizujStore()
                                }}
                                >Organizuj drugu aktivnost</button>
                        </div>
                        <div class = "col">
                            <button type = "button" 
                                style = {{width:'100%'}}
                                class = "btn btn-success" 
                                onClick = {() => {
                                        if (this.state.biranjeTimova)
                                            this.posaljiZahtjevZaMec()
                                        else
                                            this.kreirajMecBezTimova()
                                    }} 
                                disabled={OrganizujStore.kreirano}>
                                    Zakaži
                            </button>
                        </div>
                        <br/>
                    </div>
                    
                    {!this.state.biranjeTimova?<UcesniciMecBezTimova/>:null}
                </div>
            </div>
        )
    }
}

export default observer(Organizuj)
