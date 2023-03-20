import React, { Component } from 'react'
import UserStore from '../stores/UserStore'
import moment from 'moment'
import KorisnikService from '../services/KorisnikService'
import MecService from '../services/MecService'
import { Buffer } from 'buffer'
import "../css/Profil.css"
import HistorijaItem from '../components/HistorijaItem'

export default class Profil extends Component {
    state = {
        user:null,
        fileUrl:null,
        slika:null,
        changed:false,
        historija: []
    }
    async componentDidMount(){
        try {
            let u = await KorisnikService.dobaviInfo(this.props.match.params.id)

            let rez = await MecService.dobaviTermineKorisnika(UserStore.user.id)
            let zakazani = rez.data.map(r => {return {...r, tip: 1}})
            let rez2 = await MecService.dobaviMeceveKorisnika()
            let zakazani2 = rez2.data.map(r => {return {...r, tip:2}})
            let hist = [...zakazani, ...zakazani2]
            this.setState({user:u.data, historija: hist})
        } catch (error) {
            throw error
        }
    }

    uploadSliku = async()=>{
        try {
            let formData = new FormData()
            console.log(this.state.slika)
            formData.append('korisnikSlika', this.state.slika)
            const conf = {
                'content-type':'multipart/form-data'
            }
            let res = await KorisnikService.uploadSliku(formData, conf, this.state.user.id)
            console.log(res)
        } catch (error) {
            throw error
        }
    }
    render() {
        if (!this.state.user || !this.state.historija) return null
        return ( 
            <div>
                <div className="slika-info-container">
                    
                    <div className="slika-input-whole">
                        Slika: 
                        <img src= {this.state.changed?this.state.fileUrl:this.state.user.slika?
                                    `data:${"image/png"};base64,${Buffer.from(this.state.user.slika.data).toString('base64')}`:null}
                                    className="rounded mx-auto d-block img-thumbnail"
                                    style = {{width:'300px', height:'300px'}}/>
                        <input type = "file" className = "form-control" name = "korisnikSlika" accept = "image/*"
                            hidden = {this.state.user.id !== UserStore.user.id}
                            onChange = {(e) => {
                                    this.setState({
                                        changed:true,
                                        slika: e.target.files[0],
                                        fileUrl: URL.createObjectURL(e.target.files[0])}, this.uploadSliku)
                                }}/>
                    </div>
                    
                    <div className = "profil-info-whole">
                        <div className = "profil-info-line">
                            <label>Ime i prezime:</label>
                            <div className = "profil-info-content">{this.state.user.ime + " " + this.state.user.prezime}</div>
                        </div>
                        <div className = "profil-info-line">
                            <label>Username:</label>
                            <div className = "profil-info-content">{this.state.user.username}</div>
                        </div>
                        <div className = "profil-info-line">
                            <label>Država i grad:</label>
                            <div className = "profil-info-content">{this.state.user.drzava + ", " + this.state.user.grad}</div>
                        </div>
                        <div className = "profil-info-line">
                            <label>Datum rođenja:</label>
                            <div className = "profil-info-content">{moment(this.state.user.rodjendan).format("DD/MM/YYYY").toString()}</div>
                        </div>
                        <div className = "profil-info-line">
                            <label>Spol:</label>
                            <div className = "profil-info-content">{this.state.user.spol?"Muški":"Ženski"}</div>
                        </div>
                    </div>
                </div>
            
                <div className = "historija-container">
                    <label>Historija:</label>
                    {this.state.historija.map(item=>
                            <HistorijaItem data = {item}/>
                    )}
                </div>
            </div>       
        )
    }
}
