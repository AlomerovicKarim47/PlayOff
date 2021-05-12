import * as yup from 'yup'

let loginSchema = yup.object().shape({
    username: yup.string().required("Ovo polje je obavezno."),
    password: yup.string().required("Ovo polje je obavezno.")
})

export default loginSchema