import React, { Component } from 'react'
import MecService from '../services/MecService'
import sportovi from '../config/sportovi'
import ZahtjevService from '../services/ZahtjevService'
import UserStore from '../stores/UserStore'

export default class SearchMeceviBezTimova extends Component {
    state = {
        termini:[]
    }

    async componentDidMount(){
        try {
            let rez = await MecService.pretraziTerminePoMjestu(this.props.query)
            this.setState({termini: rez.data})
        } catch (error) {
            throw error
        }
    }

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
            <div>
                {this.state.termini.map(z => {
                    return (
                        <div key= {z.id} class = "card bg-light" style = {{margin:'5px', cursor:'pointer'}}>
                            <div class = "row">
                                
                                <div class = "col">
                                    {sportovi.find(s => s.id === z.sport).naziv}<br/>
                                    {z.vrijemeOdrzavanja}<br/>
                                    {z.mjesto}
                                </div>
                                <div class = "col-md-auto">
                                    <button class = "btn btn-outline-success" onClick = {() => this.posaljiZahtjev(z)}>Pridruži se</button>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        )
    }
}
