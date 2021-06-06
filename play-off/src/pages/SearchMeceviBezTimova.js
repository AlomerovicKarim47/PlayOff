import React, { Component } from 'react'
import MecService from '../services/MecService'
import sportovi from '../config/sportovi'

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
                            </div>
                        </div>
                    )
                })}
            </div>
        )
    }
}
