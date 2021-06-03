import multer, { memoryStorage } from 'multer'

var storage = multer.memoryStorage()
const uploadKorisnik = multer({
    storage:storage,
})

export default uploadKorisnik