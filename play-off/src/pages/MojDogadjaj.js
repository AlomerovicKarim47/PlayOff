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
            let res = await MecService.zavrsiMec(mec, data)
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
                                value = {tipoviDogadjajaOpcije.find(t => t.value === this.props.dogadjaj.tip)}/>
                        </div>
                    </div>

                    {this.props.dogadjaj.tip === 1?<UcesniciMecBezTimova editing = {true} did = {this.props.did}/>:null}

                    {this.props.dogadjaj.tip === 2?
                        <div class = "container-fluid">
                        <br/>
                        <div class = "row">
                            <div class = "col">
                                Tim1:
                                <input type = "text" class = "form-control" value = {this.props.dogadjaj.prviTim.ime} disabled = {true}/>
                            </div>
                            <div class = "col">
                                Tim2:
                                <input type = "text" class = "form-control" value = {this.props.dogadjaj.drugiTim.ime} disabled = {true}/>
                            </div>
                        </div><br/>
                        <div class = "row">
                            <div class = "col">
                                <img src={`data:${"image/png"};base64,${Buffer.from(this.props.dogadjaj.prviTim.slika.data).toString('base64')}`} 
                                        class="rounded mx-auto d-block img-thumbnail" style = {{width:'300px', height:'300px'}}/>
                            </div>
                            <div class = "col">
                               <div class = "row">
                                    <div class = "col">
                                        <input type = "number" class = "form-control" 
                                                style = {{height:'300px', fontSize:'200px', textAlign:'center'}} 
                                                defaultValue={this.state.rezTim1} min={0}
                                                onChange = {(e) => this.setState({rezTim1:e.target.value})}
                                                disabled = {this.props.dogadjaj.zavrsen || this.state.zavrsen}/>
                                    </div>
                                    <div class = "col">
                                        <input type = "number" class = "form-control" 
                                                style = {{height:'300px', fontSize:'200px', textAlign:'center'}} 
                                                defaultValue={this.state.rezTim2} min={0}
                                                onChange = {(e) => this.setState({rezTim2:e.target.value})}
                                                disabled = {this.props.dogadjaj.zavrsen || this.state.zavrsen}/>
                                    </div>
                                </div>
                            </div>
                            <div class = "col">
                                <img src={`data:${"image/png"};base64,${Buffer.from(this.props.dogadjaj.drugiTim.slika.data).toString('base64')}`} 
                                        class="rounded mx-auto d-block img-thumbnail" style = {{width:'300px', height:'300px'}}/>
                            </div>
                        </div><br/>
                        <div class = "row">
                            <button class = "btn btn-danger btn-lg" onClick = {() => this.zavrsiMec()} 
                                disabled = {this.props.dogadjaj.zavrsen || this.state.zavrsen}>Završi meč</button>
                        </div>
                    </div>
                    :null}

                </div>
            </div>
        )
    }
}

export default observer(MojDogadjaj)
