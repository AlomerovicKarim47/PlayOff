import * as yup from 'yup'

let mecBezTimovaSchema = yup.object().shape({
    mjesto: yup.string().required("Ovo polje je obavezno."),
    datum: yup.string().required("Ovo polje je obavezno."),
    vrijeme: yup.string().required("Ovo polje je obavezno."),
    sport: yup.number().notOneOf([0], "Ovo polje je obavezno."),
    tip: yup.string().nullable(true).required("Ovo polje je obavezno.")
})

export default mecBezTimovaSchema