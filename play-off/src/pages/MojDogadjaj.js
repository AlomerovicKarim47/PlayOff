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
import BiranjeTima from '../components/BiranjeTima'
import MecService from '../services/MecService';
import { Buffer } from 'buffer';
import Scoreboard from '../components/Scoreboard';

class MojDogadjaj extends Component {
    state = {
        id:null,
        rezTim1:0,
        rezTim2:0,
        zavrsen: false
    }
    componentDidMount(){
        OrganizujStore.editing = true
    }

    zavrsiMec = async () => {
        this.setState({zavrsen:true})
        try {
            let data = {rezTim1: this.state.rezTim1, rezTim2: this.state.rezTim2, otkazan:0}
            let mec = this.props.dogadjaj.id
            await MecService.zavrsiMec(mec, data)
        } catch (error) {
            throw error
        }
    }

    render() {
        let d = this.props.dogadjaj.vrijemeOdrzavanja.split(' ')[0]
        let vrijeme = this.props.dogadjaj.vrijemeOdrzavanja.split(' ')[1]
        let datum = moment(d, "DD/MM/YYYY")
        
        const sportOpcije = sportovi.map(s => {return {label:s.naziv, value: s.id}})
        const tipoviDogadjajaOpcije = tipoviDogadjaja.map(d => {return {label: d.naziv, value:d.id}})
        return (
            <div>
                <div class = "container-fluid">
                    
                    <label>Mjesto:</label>
                    <input type = "text" class = "form-control" placeholder = "Mjesto" disabled = {true}
                        value = {this.props.dogadjaj.mjesto}
                        />
                        
                    <label>Datum:</label>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <DatePicker
                            value = {datum}
                            disabled = {true}
                            style = {{width:'100%'}}
                            format="dd/MM/yyyy"
                        />
                    </MuiPickersUtilsProvider>
                    
                    <label>Vrijeme:</label>
                    <input type = "time" class = "form-control" disabled = {true}
                        value = {vrijeme}
                        />

                    <label>Sport:</label>
                    <Select options = {sportOpcije} className="react-select" isDisabled = {true} 
                        value = {this.props.dogadjaj.sport!==0?{value: this.props.dogadjaj.sport, 
                                label: sportovi.find(s=>s.id===this.props.dogadjaj.sport).naziv}:null}
                        onChange = {(e) => OrganizujStore.sport = e.value}/>
                    Tip događaja:
                    <Select options = {tipoviDogadjaja} className="react-select" isDisabled = {true} 
                        value = {tipoviDogadjajaOpcije.find(t => t.value === this.props.dogadjaj.tip)}/>
                        
                    {this.props.dogadjaj.tip === 1?
                        <UcesniciMecBezTimova editing = {true} did = {this.props.did} dogadjaj = {this.props.dogadjaj}/>:null}

                    {this.props.dogadjaj.tip === 2?
                        <Scoreboard 
                            dogadjaj = {this.props.dogadjaj}
                            rezTim1 = {this.state.rezTim1}
                            rezTim2 = {this.state.rezTim2}
                            zavrsen = {this.state.zavrsen}
                            changeScoreTim1 = {(val) => this.setState({rezTim1:val})}
                            changeScoreTim2 = {(val) => this.setState({rezTim2:val})}
                            zavrsiMec = {this.zavrsiMec}/>
                    :null}

                </div>
            </div>
        )
    }
}

export default observer(MojDogadjaj)
