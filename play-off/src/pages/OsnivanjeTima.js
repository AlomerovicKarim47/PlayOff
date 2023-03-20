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
                <div className="osnivanje-tima-container">
                    <div className="slika-input-whole">
                        <label>Slika:</label>
                    
                        <div class="image-container">
                            <img src={this.state.fileUrl} className="rounded mx-auto d-block img-thumbnail"
                                width = "300px" height = "300px"/>
                        </div>
                    
                        <input type = "file" className = "form-control" disabled={OsnivanjeStore.kreirano} accept = "image/*"
                            onChange = {(e) => {OsnivanjeStore.slika = e.target.files[0];
                                                this.setState({slikaError:null, fileUrl: URL.createObjectURL(e.target.files[0])})}}/>
                        <div className="validation-msg">{this.state.slikaError}</div>
                    </div>
                        <div className="osnivanje-tima-inputs">
                            <div className="input-whole">
                                <label>Ime:</label>
                                <div className="input-field">
                                    <input type = "text" className = "form-control" placeholder = "Ime" disabled = {OsnivanjeStore.kreirano}
                                        value = {OsnivanjeStore.ime}
                                        onChange = {(e) => {
                                            this.setState({imeError:null})
                                            OsnivanjeStore.ime = e.target.value}}/>
                                    <div className="validation-msg">{this.state.imeError}</div>
                                </div>
                            </div>
                            
                            <div className="input-whole">
                                <label>Sport:</label>
                                <div className="input-field">
                                    <Select options = {sportOpcije} classNameName="react-select" isDisabled = {OsnivanjeStore.kreirano}
                                        value = {OsnivanjeStore.sport!==0?{value: OsnivanjeStore.sport,
                                                                            label: sportovi.find(s=>s.id===OsnivanjeStore.sport).naziv}:null}
                                        onChange = {(e) => {OsnivanjeStore.sport = e.value
                                                            this.setState({sportError:null})
                                                            }}/>
                                    <div className="validation-msg">{this.state.sportError}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                
                <button 
                    style = {{width:'100%'}}
                    class = "btn btn-outline-success"
                    onClick = {() => {
                        resetOsnivanjeStore()
                        this.setState({imeError:null, sportError:null, slikaError:null})
                    }}
                    >Osnuj drugi tim</button>
                
                <button type = "button" 
                    style = {{width:'100%'}}
                    class = "btn btn-success"  
                    disabled={OsnivanjeStore.kreirano}
                    onClick = {()=>this.kreirajTim()}
                    >
                        Osnuj
                </button>
                <br/>
                <ClanoviTima/>
            </div>
        )
    }
}

export default observer(OsnivanjeTima)
