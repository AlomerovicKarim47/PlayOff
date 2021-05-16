import * as yup from 'yup'

let registerSchema = yup.object().shape({
    username: yup.string().required("Ovo polje je obavezno."),
    password: yup.string().required("Ovo polje je obavezno.").min(8, "Lozinka mora imati bar 8 karaktera"),
    email: yup.string().email("Unesite validnu email adresu.").required("Ovo polje je obavezno"),
    ime: yup.string().required("Ovo polje je obavezno."),
    prezime: yup.string().required("Ovo polje je obavezno."),
    rodjendan: yup.date().required("Ovo polje je obavezno."),
    drzava: yup.string().required("Ovo polje je obavezno."),
    grad: yup.string().required("Ovo polje je obavezno.")
})

export default registerSchema
