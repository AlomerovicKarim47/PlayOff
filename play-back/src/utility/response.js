const sendResponse = async (req, res) => {
    const response = {
        path: req.url,
        code: res.statusCode,
        message: res.message?res.message:"Zahtjev uspješno obrađen.",
        data: res.data?res.data:null
    }
    res.end(JSON.stringify(response))
}

export default sendResponse