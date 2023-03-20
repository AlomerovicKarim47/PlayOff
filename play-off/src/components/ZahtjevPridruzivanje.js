import React, { Component } from 'react';
import { CheckIcon, XIcon } from '@primer/octicons-react';
import sportovi from '../config/sportovi'

class ZahtjevPridruzivanje extends Component {
    render() {
        return (
            <div key= {this.props.zahtjev.id} class = "card bg-light" style = {{margin:'5px'}}>
                {"Zahtjev za prikljucivanje terminu"}<br/>
                {sportovi.find(s=>s.id===this.props.zahtjev.sport).naziv}<br/>
                {this.props.zahtjev.mjesto}
                <div style = {{position:'absolute', width:'100%', paddingRight:'30px', paddingTop:'10px'}} >
                    <div style = {{ display: 'inline-block', float: 'right', width:'auto'}} hidden={this.props.zahtjev.status!=null}>
                        <button class = "btn btn-outline-danger" style = {{marginRight:'10px'}}
                            onClick = {() => this.props.onOdbij(this.props.zahtjev)}>
                            <XIcon/>Odbij
                        </button>
                        <button class = "btn btn-outline-success" 
                            onClick = {() => this.props.onPrihvati(this.props.zahtjev)}>
                                <CheckIcon/>Prihvati
                        </button>
                    </div>
                    <div style = {{ display: 'inline-block', float: 'right', width:'auto'}} hidden = {this.props.zahtjev.status !== true}>
                        <CheckIcon/>Prihvaćeno
                    </div>
                    <div style = {{ display: 'inline-block', float: 'right', width:'auto'}} hidden = {this.props.zahtjev.status !== false}>
                        <XIcon/>Odbijeno
                    </div>
                    
                </div>
                
            </div>
        )
    }
}

export default ZahtjevPridruzivanje;
