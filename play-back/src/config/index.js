import dotenv from 'dotenv'
dotenv.config()
const config = {

    PORT: 8000,

    JWT_SECRET_KEY: process.env.JWT_SECRET,

    connectionString: process.env.NODE_ENV == "development"?
        "postgres://root:root@localhost:5432/playoff":
        process.env.DB_CONN,
    
    allowedOrigin: process.env.NODE_ENV == "development"?
    "http://localhost:3000":
    "https://playoff.onrender.com"

}
export default config