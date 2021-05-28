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

    mjesto:"",
    vrijeme: "",
    datum: new Date(),
    sport:0
})

global.orgStore = OrganizujStore

export default OrganizujStore