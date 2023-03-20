import React, { Component } from 'react'
import MecService from '../services/MecService'
import MecBezTimovaSearchResult from '../components/MecBezTimovaSearchResult'

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
                {this.state.termini.map(z => 
                    <MecBezTimovaSearchResult mec = {z}/>
                )}
            </div>
        )
    }
}
