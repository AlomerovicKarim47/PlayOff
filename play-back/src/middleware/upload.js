import multer, { memoryStorage } from 'multer'

var storage = multer.memoryStorage()
const upload = multer({
    storage:storage,
})

export default upload