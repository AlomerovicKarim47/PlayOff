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
import mecBezTimovaSchema from '../validation/MecBezTimovaValidation'
import mecSTimovimaSchema from '../validation/MecSTimovimaValidation'

class Organizuj extends Component {

    state = {
        biranjeTimova:false
    }

    componentWillUnmount(){
        resetOrganizujStore()
    }

    kreirajMecBezTimova = async () => {
        let data = {
            organizatorID: UserStore.user.id,
            sportID: OrganizujStore.sport,
            vrijemeOdrzavanja: `${moment(OrganizujStore.datum).format('DD/MM/YYYY')} ${OrganizujStore.vrijeme}`,
            mjesto: OrganizujStore.mjesto 
        }
        try {
            let val = {
                sport: OrganizujStore.sport,
                mjesto: OrganizujStore.mjesto,
                datum: OrganizujStore.datum,
                vrijeme: OrganizujStore.vrijeme,
                tip: OrganizujStore.tip?OrganizujStore.tip.label:null
            }
            await mecBezTimovaSchema.validate(val, {abortEarly: false})
            let res = await MecService.kreirajMecBezTimova(data)
            OrganizujStore.kreirano = true
            OrganizujStore.mec = (JSON.parse(res.data)).id
        } catch (error) {
            if (error.name === "ValidationError") {
                let errors = {}
                error.inner.map(i => errors[i.path + "Error"] = i.message)
                this.setState({ ...this.state, ...errors })
            }
            else
                throw error
        }
        
    }

    posaljiZahtjevZaMec = async () => {
        
        let zahtjev = {
            sadrzaj : "Zahtjev za meč.",
            posiljaocID: OrganizujStore.tim1,
            primaocID: OrganizujStore.tim2,
            sportID: OrganizujStore.sport,
            vrijeme: `${moment(OrganizujStore.datum).format('DD/MM/YYYY')} ${OrganizujStore.vrijeme}`,
            mjesto: OrganizujStore.mjesto
        }
        try {
            let val = {
                sport: OrganizujStore.sport,
                mjesto: OrganizujStore.mjesto,
                datum: OrganizujStore.datum,
                vrijeme: OrganizujStore.vrijeme,
                tip: OrganizujStore.tip?OrganizujStore.tip.label:null,
                tim1: OrganizujStore.tim1,
                tim2: OrganizujStore.tim2
            }
            await mecSTimovimaSchema.validate(val, {abortEarly:false})
            let res = await ZahtjevService.posaljiZahtjevZaMec(zahtjev)    
            OrganizujStore.kreirano = true
        } catch (error) {
            if (error.name === "ValidationError") {
                let errors = {}
                error.inner.map(i => errors[i.path + "Error"] = i.message)
                this.setState({ ...this.state, ...errors })
            }
            else
                throw error
        }
    }

    render() {
        const sportOpcije = sportovi.map(s => {return {label:s.naziv, value: s.id}})
        const tipoviDogadjajaOpcije = tipoviDogadjaja.map(d => {return {label: d.naziv, value:d.id}})
        return (
            <div>
                <div className = "input-whole">
                    <label>Mjesto: </label>
                    <div class="input-field">
                        <input type = "text" class = "form-control" placeholder = "Mjesto" disabled = {OrganizujStore.kreirano}
                            value = {OrganizujStore.mjesto}
                            onChange = {(e) => {
                                OrganizujStore.mjesto = e.target.value
                                this.setState({mjestoError:null})
                                }}/>
                        <div className="validation-msg">{this.state.mjestoError}</div>
                    </div>
                </div>
                
                <div className = "input-whole">
                    <label>Datum: </label>
                    <div class="input-field">
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <DatePicker
                                value = {OrganizujStore.datum}
                                disabled = {OrganizujStore.kreirano}
                                style = {{width:'100%'}}
                                format="dd/MM/yyyy"
                                onChange={date => {
                                    this.setState({datumError:null})
                                    OrganizujStore.datum = date}}
                            />
                            <div className="validation-msg">{this.state.rodjendanError}</div>
                        </MuiPickersUtilsProvider>
                    </div>
                    <div className="validation-msg">{this.state.datumError}</div>
                </div>
                
                <div className = "input-whole">
                    <label>Vrijeme:</label>
                    <input type = "time" class = "form-control" disabled = {OrganizujStore.kreirano}
                        value = {OrganizujStore.vrijeme}
                        onChange = {(e) => {OrganizujStore.vrijeme = e.target.value
                                            this.setState({vrijemeError:null})
                                        }}/>
                    <div className="validation-msg">{this.state.vrijemeError}</div>
                </div>
                
                <div className = "input-whole">
                    <label>Sport: </label>
                    <div class="input-field">
                        <Select options = {sportOpcije} className="react-select" isDisabled = {OrganizujStore.kreirano}
                            value = {OrganizujStore.sport!==0?{value: OrganizujStore.sport,
                                                                label: sportovi.find(s=>s.id===OrganizujStore.sport).naziv}:null}
                            onChange = {(e) => {
                                OrganizujStore.sport = e.value
                                this.setState({sportError:null})
                                }}/>
                    </div>
                    <div className="validation-msg">{this.state.sportError}</div>
                </div>

                <div className = "input-whole">
                    <label>Tip događaja:</label>
                    <div class="input-field">
                        <Select options = {tipoviDogadjajaOpcije} className="react-select" isDisabled = {OrganizujStore.kreirano}
                            value = {OrganizujStore.tip}
                            onChange = {(e) => {
                                OrganizujStore.tip = e
                                if (e.value === 2)
                                    this.setState({biranjeTimova:true, tipError:null})
                                else
                                    this.setState({biranjeTimova:false, tipError:null})
                                }}/>
                    </div>
                    <div className="validation-msg">{this.state.tipError}</div>
                </div>

                <Collapse in = {this.state.biranjeTimova}>
                    <div class = "container-fluid">
                        Timovi:
                        <br/>
                        
                            <div class = "col">
                                <BiranjeTima tim = {1} disabled = {OrganizujStore.kreirano} onChange = {() => this.setState({tim1Error:null})}/>
                                <div className="validation-msg">{this.state.tim1Error}</div>
                            </div>
                            <div class = "col">
                                <BiranjeTima tim = {2} protivnik = {true} disabled = {OrganizujStore.kreirano} onChange = {() => this.setState({tim2Error:null})}/>
                                <div className="validation-msg">{this.state.tim2Error}</div>
                            </div>
                    </div>
                </Collapse>
            
                <button 
                    style = {{width:'100%'}}
                    class = "btn btn-outline-success"
                    onClick = {() => {
                        this.setState({
                            biranjeTimova:false,
                            mjestoError:null,
                            vrijemeError: null,
                            datumError:null,
                            sportError: null,
                            tipError: null,
                            tim1Error: null,
                            tim2Error: null})
                        resetOrganizujStore()
                    }}
                    >Organizuj drugu aktivnost
                </button>
                
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
                    
                <br/>
                {!this.state.biranjeTimova?<UcesniciMecBezTimova/>:null}
            </div>
        )
    }
}

export default observer(Organizuj)
