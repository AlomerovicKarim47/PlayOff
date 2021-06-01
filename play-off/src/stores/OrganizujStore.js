import {observable} from 'mobx'

let OrganizujStore = observable({
    selektovaniUcesnik:null,
    ucesnici:[],
    ucesnikOpcije:[],
    prikaziDodavanje:false,
    ucesnikSearch:"",
    kreirano: false,
    primaocUcesnik: null,
    mec:null,
    tip:null,

    mjesto:"",
    vrijeme: "",
    datum: new Date(),
    sport:0,

    tim1:null,
    tim2:null
})

global.orgStore = OrganizujStore

export default OrganizujStore