import React, { Component } from 'react';
import {CheckIcon, XIcon} from '@primer/octicons-react'
import "../css/ZahtjevMecBezTimova.css"

class Zahtjev extends Component {
    render() {
        return (
            <div className = "card bg-light zahtjev-card">
                <div className="zahtjev-informacije">
                    <p>Sport: {this.props.data.sport}</p>
                    <p>Mjesto: {this.props.data.mjesto}</p>
                    <p>Vrijeme: {this.props.data.vrijeme}</p>
                </div>
                <div className = "zahtjev-odgovor">
                    <div className = "odgovor-btn-wrapper" hidden={this.props.data.zahtjev.status!=null}>
                        <button className = "btn btn-outline-success"
                            onClick = {() => this.props.onPrihvati(this.props.data.zahtjev)}>
                                <CheckIcon/>Prihvati
                        </button>
                        <button className = "btn btn-outline-danger" style = {{marginRight:'10px'}}
                            onClick = {() => this.props.onOdbij(this.props.data.zahtjev)}>
                            <XIcon/>Odbij
                        </button>
                    </div>
                    <div className="odgovor-wrapper">
                        <div hidden = {this.props.data.zahtjev.status !== true}>
                            <CheckIcon/>Prihvaćeno
                        </div>
                        <div hidden = {this.props.data.zahtjev.status !== false}>
                            <XIcon/>Odbijeno
                        </div>
                    </div>  
                </div>
            </div>
        );
    }
}

export default Zahtjev;
