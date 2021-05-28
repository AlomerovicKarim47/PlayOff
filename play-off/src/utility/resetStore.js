import OrganizujStore from '../stores/OrganizujStore'
import OsnivanjeStore from '../stores/OsnivanjeStore'

const resetOrganizujStore = ()=>{
        OrganizujStore.selektovaniUcesnik=null
        OrganizujStore.ucesnici=[]
        OrganizujStore.ucesnikOpcije=[]
        OrganizujStore.prikaziDodavanje=false
        OrganizujStore.ucesnikSearch=""
        OrganizujStore.kreirano= false
        OrganizujStore.primaocUcesnik= null
        OrganizujStore.mec=null

        OrganizujStore.mjesto=""
        OrganizujStore.vrijeme= ""
        OrganizujStore.datum= new Date()
        OrganizujStore.sport=0
}

const resetOsnivanjeStore = () => {
    OsnivanjeStore.selektovaniUcesnik=null
    OsnivanjeStore.ucesnici=[]
    OsnivanjeStore.ucesnikOpcije=[]
    OsnivanjeStore.prikaziDodavanje=false
    OsnivanjeStore.ucesnikSearch=""
    OsnivanjeStore.kreirano= false
    OsnivanjeStore.primaocUcesnik= null
    OsnivanjeStore.tim=null
    OsnivanjeStore.sport=0
    OsnivanjeStore.ime = ""
}

export {
    resetOrganizujStore,
    resetOsnivanjeStore
}