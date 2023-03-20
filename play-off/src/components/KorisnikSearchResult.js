import React, { Component } from 'react';
import { Buffer } from 'buffer';
import moment from 'moment';

class KorisnikSearchResult extends Component {
    render() {
        return (
            <div key= {this.props.korisnik.id} class = "card bg-light" style = {{margin:'5px', cursor:'pointer'}} onClick = {this.props.onClick}>
                <div class = "row">
                    <div class = "col-md-auto">
                        {this.props.korisnik.slika?<img src={`data:${"image/png"};base64,${Buffer.from(this.props.korisnik.slika.data).toString('base64')}`} 
                                    class="rounded mx-auto d-block img-thumbnail" style = {{width:'100px', height:'100px', float:'left'}}/>:null}      
                    </div>
                    <div class = "col">
                        {this.props.korisnik.ime + " " + this.props.korisnik.prezime + " (" + this.props.korisnik.username +")"}<br/>
                        {"Mjesto: " + this.props.korisnik.grad + ", " + this.props.korisnik.drzava}<br/>
                        {"Datum rodjenja: " + moment(this.props.korisnik.rodjendan).format("DD/MM/YYYY").toString()}
                    </div>
                </div>
            </div>
        )
    }
}

export default KorisnikSearchResult;
