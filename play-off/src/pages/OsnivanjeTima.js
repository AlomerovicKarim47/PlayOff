import React, { Component } from 'react'
import OsnivanjeStore from '../stores/OsnivanjeStore'
import sportovi from '../config/sportovi'
import Select from 'react-select'
import {observer} from 'mobx-react'
import ClanoviTima from '../components/ClanoviTima'
import { resetOsnivanjeStore } from '../utility/resetStore'
import TimService from '../services/TimService'
import UserStore from '../stores/UserStore'
import osnivanjeTimaSchema from '../validation/OsnivanjeTimaValidation'

class OsnivanjeTima extends Component {

    state = {
        fileUrl:null
    }

    componentWillUnmount(){
        resetOsnivanjeStore()
    }

    kreirajTim = async ()=>{
        
        let data = {
            ime: OsnivanjeStore.ime,
            kapiten: UserStore.user.id,
            sport: OsnivanjeStore.sport
        }
        try {
            console.log(OsnivanjeStore.slika)
            await osnivanjeTimaSchema.validate({
                slika: OsnivanjeStore.slika?OsnivanjeStore.slika.name:null,
                ime: OsnivanjeStore.ime,
                sport: OsnivanjeStore.sport
            }, {abortEarly:false})
            let res = await TimService.dodajTim(data)
            OsnivanjeStore.kreirano = true
            OsnivanjeStore.tim = JSON.parse(res.data).id
            let formData = new FormData()
            formData.append('timSlika', OsnivanjeStore.slika)
            const config = {
                'content-type':'multipart/form-data'
            }
            await TimService.uploadTimSliku(formData, config, OsnivanjeStore.tim)
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
        return (
            <div>
                <div class = "container-fluid" style = {{padding:"20px"}}>
                    <div class = "mx-auto" style = {{width:'50px'}}>Slika:</div>  
                    <div class = "row" >
                        <img src={this.state.fileUrl} class="rounded mx-auto d-block img-thumbnail" style = {{width:'300px', height:'300px'}}/>
                    </div>
                    <div class = "row">
                    <div style = {{width:'300px', margin:'0 auto'}}>
                        <input type = "file" class = "form-control" style = {{width:'100%'}} disabled={OsnivanjeStore.kreirano} accept = "image/*"
                            onChange = {(e) => {OsnivanjeStore.slika = e.target.files[0]; 
                                                this.setState({slikaError:null, fileUrl: URL.createObjectURL(e.target.files[0])})}}/>
                        <div className="validation-msg">{this.state.slikaError}</div>

                    </div>
                    </div>
                    <div class = "row">
                        <div class = "col-sm-1">Ime:</div> 
                        <div class = "col-sm-11">
                            <input type = "text" class = "form-control" placeholder = "Ime" disabled = {OsnivanjeStore.kreirano}
                                value = {OsnivanjeStore.ime}
                                onChange = {(e) => {
                                    this.setState({imeError:null})
                                    OsnivanjeStore.ime = e.target.value}}/>
                            <div className="validation-msg">{this.state.imeError}</div>
                        </div>
                    </div>
                    <div class = "row">
                        <div class = "col-sm-1">Sport:</div> 
                        <div class = "col-sm-11">
                            <Select options = {sportOpcije} className="react-select" isDisabled = {OsnivanjeStore.kreirano} 
                                value = {OsnivanjeStore.sport!==0?{value: OsnivanjeStore.sport, 
                                                                    label: sportovi.find(s=>s.id===OsnivanjeStore.sport).naziv}:null}
                                onChange = {(e) => {OsnivanjeStore.sport = e.value
                                                    this.setState({sportError:null})
                                                    }}/>
                            <div className="validation-msg">{this.state.sportError}</div>
                        </div>
                    </div>
                    <div class = "row">
                        <div class = "col">
                            <button 
                                style = {{width:'100%'}}
                                class = "btn btn-outline-success"
                                onClick = {() => {
                                    resetOsnivanjeStore()
                                    this.setState({imeError:null, sportError:null, slikaError:null})
                                }}
                                >Osnuj drugi tim</button>
                        </div>
                        <div class = "col">
                            <button type = "button" 
                                style = {{width:'100%'}}
                                class = "btn btn-success"  
                                disabled={OsnivanjeStore.kreirano}
                                onClick = {()=>this.kreirajTim()}
                                >
                                    Osnuj
                            </button>
                        </div>
                        <br/>
                    </div>
                    <ClanoviTima/>
                </div>
            </div>
        )
    }
}

export default observer(OsnivanjeTima)
