import React, { Component } from 'react'
import OrganizujStore from '../stores/OrganizujStore'
import sportovi from '../config/sportovi'
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns'
import Select from 'react-select'
import UcesniciMecBezTimova from '../components/UcesniciMecBezTimova'
import tipoviDogadjaja from '../config/tipoviDogadjaja'
import { observer } from 'mobx-react';
import moment from 'moment'

class MojDogadjaj extends Component {
    state = {
        id:null
    }
    componentDidMount(){
        OrganizujStore.editing = true
    }
    render() {
        let d = this.props.dogadjaj.vrijemeOdrzavanja.split(' ')[0]
        let vrijeme = this.props.dogadjaj.vrijemeOdrzavanja.split(' ')[1]
        let datum = moment(d, "DD/MM/YYYY")
        
        const sportOpcije = sportovi.map(s => {return {label:s.naziv, value: s.id}})
        const tipoviDogadjajaOpcije = tipoviDogadjaja.map(d => {return {label: d.naziv, value:d.id}})
        return (
            <div>
                <div class = "container-fluid" style = {{padding:"20px"}}>
                    
                    <div class = "row">
                        <div class = "col-sm-1">Mjesto:</div> 
                        <div class = "col-sm-11">
                            <input type = "text" class = "form-control" placeholder = "Mjesto" disabled = {true}
                                value = {this.props.dogadjaj.mjesto}
                                />
                        </div>
                    </div>

                    <div class = "row">
                        <div class = "col-sm-1">Datum:</div> 
                        <div class = "col-sm-11">
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <DatePicker
                                value = {datum}
                                disabled = {true}
                                style = {{width:'100%'}}
                                format="dd/MM/yyyy"
                            />
                            <div className="validation-msg">{this.state.rodjendanError}</div>
                        </MuiPickersUtilsProvider>
                    </div>
                    </div>
                    
                    <div class = "row">
                        <div class = "col-sm-1">Vrijeme:</div> 
                        <div class = "col-sm-11">
                            <input type = "time" class = "form-control" disabled = {true}
                                value = {vrijeme}
                                />
                        </div>
                    </div>

                    <div class = "row">
                        <div class = "col-sm-1">Sport:</div> 
                        <div class = "col-sm-11">
                            <Select options = {sportOpcije} className="react-select" isDisabled = {true} 
                                value = {this.props.dogadjaj.sport!==0?{value: this.props.dogadjaj.sport, 
                                        label: sportovi.find(s=>s.id===this.props.dogadjaj.sport).naziv}:null}
                                onChange = {(e) => OrganizujStore.sport = e.value}/>
                        </div>
                    </div>
                    <div class = "row">
                        <div class = "col-sm-1">Tip događaja:</div> 
                        <div class = "col-sm-11">
                            <Select options = {tipoviDogadjaja} className="react-select" isDisabled = {true} 
                                value = {tipoviDogadjajaOpcije.find(t => t.value === this.props.tip)}/>
                        </div>
                    </div>

                    <UcesniciMecBezTimova editing = {true} did = {this.props.did}/>
                </div>
            </div>
        )
    }
}

export default observer(MojDogadjaj)
