import React, { Component } from 'react'
import MecService from '../services/MecService'
import UserStore from '../stores/UserStore'
import {observer} from 'mobx-react'
import {Route, withRouter} from 'react-router-dom'
import MojDogadjaj from '../pages/MojDogadjaj'
import moment from 'moment'
import MojDogadjajItem from '../components/MojDogadjajItem'

class MojiDogadjaji extends Component {
    state = {
        dogadjaji : [],
        redirect : false,
        odabraniDogadjaj:null
    }

    async componentDidMount(){
        let res = await MecService.dobaviOrganizovaneTermineKorisnika(UserStore.user.id)
        let zakazani = JSON.parse(res.data).map(d => {return {...d, tip:1}})
        let rez2 = await MecService.dobaviMeceveKorisnika(true)

        let zakazani2 = rez2.data.map(r => {return {...r, tip:2}})
    
        zakazani = [...zakazani, ...zakazani2].sort((a, b) => moment(a).isBefore(moment(b)))

        this.setState({dogadjaji:zakazani})
    }

    async componentDidUpdate(prev){
        if (this.props.location !== prev.location && this.props.location.pathname === "/home/organizacija/mojiDogadjaji")
            await this.componentDidMount()
    }

    render() {
        return (
            <div>
               <Route exact path = {`/home/organizacija/mojiDogadjaji`}>
                {this.state.dogadjaji.map(m=>
                    <MojDogadjajItem key = {m.id} data = {m} onClick = {() => this.setState({odabraniDogadjaj:m})}/>
                )}   
                </Route>
                <Route path = {`/home/organizacija/mojiDogadjaji/dogadjaj/:id`} render = {({match}) => (
                    <MojDogadjaj tip = {this.state.dogadjaji.find(d=>d.id===parseInt(match.params.id)).tip} did = {parseInt(match.params.id)} dogadjaj = {this.state.odabraniDogadjaj}/>
                )}/>   
            </div>
        )
    }
}

export default observer(withRouter(MojiDogadjaji))
