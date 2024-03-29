import React, { Component } from 'react'
import sportovi from '../config/sportovi'
import ClanoviTima from '../components/ClanoviTima'
import Select from 'react-select'
import {observer} from 'mobx-react'
import {Buffer} from 'buffer'

class MojTim extends Component {
    render() {
        const sportOpcije = sportovi.map(s => {return {label:s.naziv, value: s.id}})
        
        return (
            <div>
                <div class = "container-fluid" style = {{padding:"20px"}}>
                    <div class = "mx-auto" style = {{width:'50px'}}>Slika:</div>  
                    <div class = "row" >
                        
                            <img src={`data:${"image/png"};base64,${Buffer.from(this.props.tim.slika.data).toString('base64')}`} 
                                class="rounded mx-auto d-block img-thumbnail" style = {{width:'300px', height:'300px'}}/>
                        
                    </div>
                    <div class = "row">
                        <div class = "col-sm-1">Ime:</div> 
                        <div class = "col-sm-11">
                            <input type = "text" class = "form-control" placeholder = "Ime" disabled = {true}
                                value = {this.props.tim.ime}/>
                        </div>
                    </div>
                    <div class = "row">
                        <div class = "col-sm-1">Sport:</div> 
                        <div class = "col-sm-11">
                            <Select options = {sportOpcije} className="react-select" isDisabled = {true} 
                                value = {this.props.tim.sport!==0?{value: this.props.tim.sport, 
                                                                    label: sportovi.find(s=>s.id===this.props.tim.sport).naziv}:null}/>
                        </div>
                    </div>
                    <ClanoviTima editing = {true} did = {this.props.did}/>
                </div>
            </div>
        )
    }
}

export default observer(MojTim)