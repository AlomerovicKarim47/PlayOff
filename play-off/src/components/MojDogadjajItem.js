import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Buffer } from 'buffer';
import sportovi from '../config/sportovi';

class MojDogadjajItem extends Component {
    render() {
        if (this.props.data.sport !== 0)
            return(
            <Link key = {this.props.data.id} to = {`/home/organizacija/mojiDogadjaji/dogadjaj/${this.props.data.id}`} style = {{textDecoration:'none', color:'black'}} 
            onClick = {() => this.props.onClick()}>
                <div class = {this.props.data.tip===1?"card bg-light":"card" } style = {{margin:'5px', cursor:'pointer', background:"#ccffcc", textAlign:'center'}} hidden = {this.props.data.tip !== 1}>
                    {sportovi.find(s => s.id === this.props.data.sport).naziv}
                    <br/>
                    {this.props.data.vrijemeOdrzavanja}<br/>
                    {this.props.data.mjesto}
                </div>
                <div class = {this.props.data.tip===1?"card bg-light":"card" } style = {{margin:'5px', cursor:'pointer', background:"#ccffcc"}} hidden = {this.props.data.tip !== 2}>
                    <div class = "row">
                        
                        {this.props.data.tip===2?<div class = "col-md-auto">
                            <img src={`data:${"image/png"};base64,${Buffer.from(this.props.data.prviTim.slika.data).toString('base64')}`} 
                                            class="rounded mx-auto d-block img-thumbnail" style = {{width:'100px', height:'100px', float:'left'}}/>      
                        </div>:null}
                            <div class = "col" style = {{textAlign:'center'}}>
                            {this.props.data.tip === 2?this.props.data.prviTim.ime + " - " + this.props.data.drugiTim.ime:null}<br hidden={this.props.data.tip !== 2}/>
                            {this.props.data.zavrsen?this.props.data.rezTim1 + " - " + this.props.data.rezTim2:null}<br hidden = {this.props.data.zavrsen!==true}/>
                            {sportovi.find(s => s.id === this.props.data.sport).naziv}
                            <br/>
                            {this.props.data.vrijemeOdrzavanja}<br/>
                            {this.props.data.mjesto}
                        </div>
                        {this.props.data.tip===2?<div class = "col-md-auto">
                            <img src={`data:${"image/png"};base64,${Buffer.from(this.props.data.drugiTim.slika.data).toString('base64')}`} 
                                        class="rounded mx-auto d-block img-thumbnail" style = {{width:'100px', height:'100px', float:'left'}}/>      
                        </div>:null}
                    </div>
                </div>
            </Link>)
    }
}

export default MojDogadjajItem;
