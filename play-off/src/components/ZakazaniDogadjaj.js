import React, { Component } from 'react';
import sportovi from '../config/sportovi';
import { Buffer } from 'buffer';

class ZakazaniDogadjaj extends Component {
    render() {
        if (this.props.data.sport !== 0)
            if (this.props.data.tip === 2)
            return(<div class = {this.props.data.tip===1?"card bg-light":"card" }
                        style = {{margin:'5px', cursor:'pointer', background:"#ccffcc"}}>
                        <div class = "row">
                        <div class = "col-md-auto">
                            <img src={`data:${"image/png"};base64,${Buffer.from(this.props.data.prviTim.slika.data).toString('base64')}`} 
                                        class="rounded mx-auto d-block img-thumbnail" style = {{width:'100px', height:'100px', float:'left'}}/>      
                        </div>
                        <div class = "col" style = {{textAlign:'center'}}>
                            {this.props.data.prviTim.ime + " - " + this.props.data.drugiTim.ime}<br/>
                            {this.props.data.zavrsen?this.props.data.rezTim1 + " - " + this.props.data.rezTim2:null}<br hidden = {this.props.data.zavrsen!==true}/>
                            {sportovi.find(s => s.id === this.props.data.sport).naziv}<br/>
                            {this.props.data.vrijemeOdrzavanja}<br/>
                            {this.props.data.mjesto}
                        </div>
                        <div class = "col-md-auto">
                            <img src={`data:${"image/png"};base64,${Buffer.from(this.props.data.drugiTim.slika.data).toString('base64')}`} 
                                        class="rounded mx-auto d-block img-thumbnail" style = {{width:'100px', height:'100px', float:'left'}}/>      
                        </div>
                        </div>

                </div>)
            else if (this.props.data.tip === 1)
            return(<div class = {this.props.data.tip===1?"card bg-light":"card" }
                        style = {{margin:'5px', cursor:'pointer', background:"#ccffcc", textAlign:'center'}}>
                            {sportovi.find(s => s.id === this.props.data.sport).naziv}<br/>
                            {this.props.data.vrijemeOdrzavanja}<br/>
                            {this.props.data.mjesto}
                </div>)
    }
}

export default ZakazaniDogadjaj;
