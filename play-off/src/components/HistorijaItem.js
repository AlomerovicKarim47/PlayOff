import React, { Component } from 'react';
import sportovi from '../config/sportovi'
import { Buffer } from 'buffer';
import "../css/HistorijaItem.css"

class HistorijaItem extends Component {
    render() {
        if (this.props.data.sport !== 0)
            if (this.props.data.tip === 2)
            return(
                <div className = "card">
                    <div className = "historija-container-timovi">
                        <div className = "historija-slika">
                            <img src={`data:${"image/png"};base64,${Buffer.from(this.props.data.prviTim.slika.data).toString('base64')}`} 
                                        class="rounded mx-auto d-block img-thumbnail" style = {{width:'100px', height:'100px'}}/>      
                        </div>
                        <div className = "historija-info">
                            {this.props.data.prviTim.ime + " - " + this.props.data.drugiTim.ime}<br/>
                            {this.props.data.zavrsen?this.props.data.rezTim1 + " - " + this.props.data.rezTim2:null}<br hidden = {this.props.data.zavrsen!==true}/>
                            {sportovi.find(s => s.id === this.props.data.sport).naziv}<br/>
                            {this.props.data.vrijemeOdrzavanja}<br/>
                            {this.props.data.mjesto}
                        </div>
                        <div className = "historija-slika">
                            <img src={`data:${"image/png"};base64,${Buffer.from(this.props.data.drugiTim.slika.data).toString('base64')}`} 
                                        class="rounded mx-auto d-block img-thumbnail" style = {{width:'100px', height:'100px'}}/>      
                        </div>
                    </div>
                </div>)
        else if (this.props.data.tip === 1)
            return(
                <div className = "card">
                    <div className="historija-item">
                        {sportovi.find(s => s.id === this.props.data.sport).naziv}<br/>
                        {this.props.data.vrijemeOdrzavanja}<br/>
                        {this.props.data.mjesto}
                    </div>
                </div>)
}}

export default HistorijaItem;
