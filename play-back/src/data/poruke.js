import Sequelize from 'sequelize'
const Op = Sequelize.Op
let baza = null

class PorukeData{
    static postaviBazu(db){
        baza = db
    }
	static async posaljiPoruku(msg) {
        try {
            await baza.Poruka.create(msg)
        } catch (error) {
            throw error
        }
    }
	
	static async dobaviPoruke(korisnikID) {
        try {
            let poruke = await baza.Poruka.findAll({ where: { primaoc: korisnikID } })
			let poruke2 = await baza.Poruka.findAll({ where: { posiljaoc: korisnikID } })
			let poruke3
			if(poruke.length == 0 && poruke2.length == 0) return poruke3
			poruke3 = [poruke, poruke2]
            return poruke3
        } catch (error) {
            throw error
        }
    }
	
}

export default PorukeData