import React, { Component } from 'react'
import KorisnikService from '../services/KorisnikService'
import {withRouter} from 'react-router-dom'
import KorisnikSearchResult from '../components/KorisnikSearchResult'

class SearchKorisnici extends Component {
    state = {
        korisnici : []
    }

    async componentDidUpdate(){
        if (this.props.refresh){
            try {
                let rez = await KorisnikService.usernameSearch(this.props.query)
                this.setState({korisnici: JSON.parse(rez.data)})
            } catch (error) {
                throw error
            }
            this.props.resetRefresh()
        }
    }

    async componentDidMount(){
        try {
            let rez = await KorisnikService.usernameSearch(this.props.query)
            this.setState({korisnici: JSON.parse(rez.data)})
        } catch (error) {
            throw error
        }
    }
    render() {
        if (!this.state.korisnici) return null
        return (
            <div>
                {this.state.korisnici.map(z => 
                    <KorisnikSearchResult 
                        korisnik = {z}
                        onClick = {() => this.props.history.push("/home/profil/" + z.id)}/>
                )}
            </div>
        )
    }
}

export default withRouter(SearchKorisnici)
