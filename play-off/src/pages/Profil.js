import React, { Component } from 'react'
import UserStore from '../stores/UserStore'
import moment from 'moment'
import KorisnikService from '../services/KorisnikService'
import TimService from '../services/TimService'
import MecService from '../services/MecService'
import sportovi from '../config/sportovi'

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
            <div class = "container">
                <div class = "row">
                    <div class = "col-md-auto">
                        <div class = "mx-auto" style = {{width:'50px'}}>Slika:</div>  
                        <div class = "row" >
                            <img src= {this.state.changed?this.state.fileUrl:this.state.user.slika?
                                        `data:${"image/png"};base64,${Buffer.from(this.state.user.slika.data).toString('base64')}`:null} 
                                        class="rounded mx-auto d-block img-thumbnail" 
                                 
                                style = {{width:'300px', height:'300px'}}/>
                        </div>
                        <div class = "row">
                            <div style = {{width:'300px', margin:'0 auto'}}>
                                <input type = "file" class = "form-control" name = "korisnikSlika" style = {{width:'100%'}} accept = "image/*"
                                hidden = {this.state.user.id !== UserStore.user.id}
                                    onChange = {(e) => {
                                            this.setState({
                                                changed:true,
                                                slika: e.target.files[0],
                                                fileUrl: URL.createObjectURL(e.target.files[0])}, this.uploadSliku)
                                        }}/>
                            </div>
                        </div>
                    </div>
                    <div class = "col" style = {{fontSize:'20px', padding:'40px'}}>
                        <div class = "row info-line" >
                            <div class = "col-2">Ime i prezime:</div><div class = "col-10">{this.state.user.ime + " " + this.state.user.prezime}</div>
                        </div>
                        <div class = "row info-line">
                            <div class = "col-2">Username:</div><div class = "col-10">{this.state.user.username}</div>
                        </div>
                        <div class = "row info-line" >
                            <div class = "col-2">Država i grad:</div><div class = "col-10">{this.state.user.drzava + ", " + this.state.user.grad}</div>
                        </div>
                        <div class = "row info-line" >
                            <div class = "col-2">Datum rođenja:</div><div class = "col-10">{moment(this.state.user.rodjendan).format("DD/MM/YYYY").toString()}</div>
                        </div>
                        <div class = "row info-line" >
                            <div class = "col-2">Spol:</div><div class = "col-10">{this.state.user.spol?"Muški":"Ženski"}</div>
                        </div>
                    </div>
                </div>

                
                <div class = "row">
                    <div style = {{paddingLeft:'20px', fontSize:'20px'}}>Historija:</div>
                {this.state.historija.map(m=>{
                    if (m.sport !== 0)
                    if (m.tip === 2)
                    return(<div class = {m.tip===1?"card bg-light":"card" }
                                style = {{margin:'5px', cursor:'pointer', background:"#ccffcc"}}>
                                <div class = "row">
                                <div class = "col-md-auto">
                                    <img src={`data:${"image/png"};base64,${Buffer.from(m.prviTim.slika.data).toString('base64')}`} 
                                                class="rounded mx-auto d-block img-thumbnail" style = {{width:'100px', height:'100px', float:'left'}}/>      
                                </div>
                                <div class = "col" style = {{textAlign:'center'}}>
                                    {m.prviTim.ime + " - " + m.drugiTim.ime}<br/>
                                    {m.zavrsen?m.rezTim1 + " - " + m.rezTim2:null}<br hidden = {m.zavrsen!==true}/>
                                    {sportovi.find(s => s.id === m.sport).naziv}<br/>
                                    {m.vrijemeOdrzavanja}<br/>
                                    {m.mjesto}
                                </div>
                                <div class = "col-md-auto">
                                    <img src={`data:${"image/png"};base64,${Buffer.from(m.drugiTim.slika.data).toString('base64')}`} 
                                                class="rounded mx-auto d-block img-thumbnail" style = {{width:'100px', height:'100px', float:'left'}}/>      
                                </div>
                                </div>

                        </div>)
                    else if (m.tip === 1)
                    return(<div class = {m.tip===1?"card bg-light":"card" }
                                style = {{margin:'5px', cursor:'pointer', background:"#ccffcc", textAlign:'center'}}>
                                    {sportovi.find(s => s.id === m.sport).naziv}<br/>
                                    {m.vrijemeOdrzavanja}<br/>
                                    {m.mjesto}
                        </div>)
                })}
                </div>
            </div>       
        )
    }
}
