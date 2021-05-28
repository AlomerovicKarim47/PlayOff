import {observable} from 'mobx'

let OsnivanjeStore = observable({
    selektovaniUcesnik:null,
    ucesnici:[],
    ucesnikOpcije:[],
    prikaziDodavanje:false,
    ucesnikSearch:"",
    kreirano: false,
    primaocUcesnik: null,
    tim:null,
    sport:0,
    ime:""
})

export default OsnivanjeStore