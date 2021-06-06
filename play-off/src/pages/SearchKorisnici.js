import React, { Component } from 'react'
import KorisnikService from '../services/KorisnikService'
import moment from 'moment'
import {withRouter} from 'react-router-dom'

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
                {this.state.korisnici.map(z => {
                    return (
                        <div key= {z.id} class = "card bg-light" style = {{margin:'5px', cursor:'pointer'}} onClick = {() => this.props.history.push("/home/profil/" + z.id)}>
                            <div class = "row">
                                <div class = "col-md-auto">
                                    <img src={`data:${"image/png"};base64,${Buffer.from(z.slika.data).toString('base64')}`} 
                                                class="rounded mx-auto d-block img-thumbnail" style = {{width:'100px', height:'100px', float:'left'}}/>      
                                </div>
                                <div class = "col">
                                    {z.ime + " " + z.prezime + " (" + z.username +")"}<br/>
                                    {"Mjesto: " + z.grad + ", " + z.drzava}<br/>
                                    {"Datum rodjenja: " + moment(z.rodjendan).format("DD/MM/YYYY").toString()}
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        )
    }
}

export default withRouter(SearchKorisnici)
