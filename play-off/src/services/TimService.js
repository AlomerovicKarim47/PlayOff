import axios from 'axios'
import config from '../config/config'
import UserStore from '../stores/UserStore'

class TimService{
    static async dodajTim(data){
        try {
            let res = await axios.post(`${config.BACKEND_URL}/tim`, data)
            return res.data
        } catch (error) {
            return error.response.data
        }
    }

    static async uploadTimSliku(data, conf, tim){
        try {
            let res = await axios.post(`${config.BACKEND_URL}/tim/slika/${tim}`, data, conf)
            return res.data
        } catch (error) {
            return error.response.data
        }
    }

    static async dobaviOsnovaneTimove(term, sport){
        let params = ""
        if (term) params = `?term=${term}`
        if (sport) params += `&sport=${sport}`
        try {
            let res = await axios.get(`${config.BACKEND_URL}/tim/osnovani/${UserStore.user.id}${params}`)
            return res.data
        } catch (error) {
            return error.response.data
        }
    }

    static async dobaviTimove(term, sport, kapitenZaIzbaciti){
        let params = ""
        if (term) params = `?term=${term}`
        if (sport) params += `&sport=${sport}`
        if (kapitenZaIzbaciti) params += `&kapitenZaIzbaciti=${kapitenZaIzbaciti}`
        try {
            let res = await axios.get(`${config.BACKEND_URL}/tim${params}`)
            return res.data
        } catch (error) {
            return error.response.data
        }
    }
}

export default TimService
