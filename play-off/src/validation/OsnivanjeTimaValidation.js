import * as yup from 'yup'

let osnivanjeTimaSchema = yup.object().shape({
    ime: yup.string().required("Ovo polje je obavezno."),
    sport: yup.number().notOneOf([0], "Ovo polje je obavezno."),
    slika: yup.string().nullable(true).required("Ovo polje je obavezno.")
})

export default osnivanjeTimaSchema