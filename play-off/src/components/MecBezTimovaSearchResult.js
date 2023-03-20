import React, { Component } from 'react';
import sportovi from '../config/sportovi'
import ZahtjevService from '../services/ZahtjevService';
import UserStore from '../stores/UserStore';

class MecBezTimovaSearchResult extends Component {

    posaljiZahtjev = async (termin) => {
        try {
            let data = {
                primaoc: termin.organizator,
                posiljaoc: UserStore.user.id,
                vrijemeOdrzavanja: termin.vrijemeOdrzavanja,
                mjesto: termin.mjesto,
                sport: termin.sport,
                mec: termin.id
            }
            let res = await ZahtjevService.posaljiZahtjevPridruzivanje(data)
            console.log(res)
        } catch (error) {
            throw error
        }
    }

    render() {
        return (
            <div key= {this.props.mec.id} class = "card bg-light" style = {{margin:'5px', cursor:'pointer'}}>
                <div class = "row">
                    
                    <div class = "col">
                        {sportovi.find(s => s.id === this.props.mec.sport).naziv}<br/>
                        {this.props.mec.vrijemeOdrzavanja}<br/>
                        {this.props.mec.mjesto}
                    </div>
                    <div class = "col-md-auto">
                        <button class = "btn btn-outline-success" onClick = {() => this.posaljiZahtjev(this.props.mec)}>Pridruži se</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default MecBezTimovaSearchResult;
