import React, { Component } from 'react'
import OsnivanjeStore from '../stores/OsnivanjeStore'
import sportovi from '../config/sportovi'
import Select from 'react-select'
import {observer} from 'mobx-react'
import ClanoviTima from '../components/ClanoviTima'
import { resetOsnivanjeStore } from '../utility/resetStore'
import TimService from '../services/TimService'
import UserStore from '../stores/UserStore'


class OsnivanjeTima extends Component {

    state = {
        fileUrl:null
    }

    componentWillUnmount(){
        resetOsnivanjeStore()
    }

    kreirajTim = async ()=>{
        OsnivanjeStore.kreirano = true
        let data = {
            ime: OsnivanjeStore.ime,
            kapiten: UserStore.user.id,
            sport: OsnivanjeStore.sport
        }
        try {
            let res = await TimService.dodajTim(data)
            OsnivanjeStore.tim = JSON.parse(res.data).id
            let formData = new FormData()
            formData.append('timSlika', OsnivanjeStore.slika)
            console.log(OsnivanjeStore.slika)
            const config = {
                'content-type':'multipart/form-data'
            }
            let res2 = await TimService.uploadTimSliku(formData, config, OsnivanjeStore.tim)
            console.log(res2)
        } catch (error) {
            throw error
        }
    }

    render() {
        const sportOpcije = sportovi.map(s => {return {label:s.naziv, value: s.id}})
        return (
            <div>
                <div class = "container-fluid" style = {{padding:"20px"}}>
                   <div class = "row" >
                        <div class = "card"style = {{width:'20%', height:'0', paddingBottom:'20%', margin:'0 auto'}}>
                            <img src={this.state.fileUrl} class="img-fluid"/>
                        </div>
                    </div>
                    <div class = "row">
                    <div style = {{width:'20%', margin:'0 auto'}}>
                        <input type = "file" class = "form-control" style = {{width:'100%'}} disabled={OsnivanjeStore.kreirano} accept = "image/*"
                            onChange = {(e) => {OsnivanjeStore.slika = e.target.files[0]; 
                                                this.setState({fileUrl: URL.createObjectURL(e.target.files[0])})}}/>
                    </div>
                    </div>
                    <div class = "row">
                        <div class = "col-sm-1">Ime:</div> 
                        <div class = "col-sm-11">
                            <input type = "text" class = "form-control" placeholder = "Ime" disabled = {OsnivanjeStore.kreirano}
                                value = {OsnivanjeStore.ime}
                                onChange = {(e) => {
                                    OsnivanjeStore.ime = e.target.value}}/>
                        </div>
                    </div>
                    <div class = "row">
                        <div class = "col-sm-1">Sport:</div> 
                        <div class = "col-sm-11">
                            <Select options = {sportOpcije} className="react-select" isDisabled = {OsnivanjeStore.kreirano} 
                                value = {OsnivanjeStore.sport!==0?{value: OsnivanjeStore.sport, 
                                                                    label: sportovi.find(s=>s.id===OsnivanjeStore.sport).naziv}:null}
                                onChange = {(e) => OsnivanjeStore.sport = e.value}/>
                        </div>
                    </div>
                    <div class = "row">
                        <div class = "col">
                            <button 
                                style = {{width:'100%'}}
                                class = "btn btn-outline-success"
                                onClick = {() => resetOsnivanjeStore()}
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
