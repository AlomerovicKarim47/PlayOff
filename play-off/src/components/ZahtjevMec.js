import React, { Component } from 'react';
import {XIcon, CheckIcon} from '@primer/octicons-react'
import { Buffer } from 'buffer'
import '../css/ZahtjevMec.css'

class ZahtjevMec extends Component {
    render() {
        return (
            <div className = "card bg-light zahtjev-card">
                <div className = "zahtjev-mec-card">            
                    <div className="zahtjev-mec-timovi">
                        <div className = "zahtjev-mec-slika">
                            <img alt = "" src={`data:${"image/png"};base64,${Buffer.from(this.props.data.z.prviTim.slika.data).toString('base64')}`}/>
                        </div>
                        <div className = "zahtjev-mec-informacije">
                            <p>Sport: {this.props.data.sport}</p>
                            <p>Timovi: {this.props.data.z.prviTim.ime + " - " + this.props.data.z.drugiTim.ime}</p>
                            <p>Mjesto: {this.props.data.z.mjesto}</p>
                            <p>Vrijeme: {this.props.data.z.vrijemeOdrzavanja}</p>
                        </div>
                        <div className = "zahtjev-mec-slika">
                            <img alt = "" src={`data:${"image/png"};base64,${Buffer.from(this.props.data.z.drugiTim.slika.data).toString('base64')}`}/>
                        </div>
                        
                    </div>
                    <div className = "zahtjev-mec-odgovor">
                        <div className='odgovor-mec-btn-wrapper' hidden={this.props.data.z.status!=null}>
                            <button class = "btn btn-outline-danger" style = {{marginRight:'10px'}}
                                onClick = {() => this.props.onOdbij(this.props.data.z)}>
                                <XIcon/>Odbij
                            </button>
                            <button class = "btn btn-outline-success" 
                                onClick = {() => this.props.onPrihvati(this.props.data.z)}>
                                    <CheckIcon/>Prihvati
                            </button>
                        </div>
                        <div className="odgovor-mec-wrapper">
                            <div hidden = {this.props.data.z.status !== true}>
                                <CheckIcon/>Prihvaćeno
                            </div>
                            <div hidden = {this.props.data.z.status !== false}>
                                <XIcon/>Odbijeno
                            </div>
                        </div>
                    </div>                 
                </div>
            </div>
        );
    }
}

export default ZahtjevMec;
