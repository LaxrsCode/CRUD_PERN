import express from "express"
import router from "./router"
import db from "../src/config/db"

//Conectamos a la base de datos
async function connectDB() {
    try {
        await db.authenticate()
        db.sync()
        console.log('Conexion exitosa a la DB')
        
    } catch (error) {
        console.log(error)
        console.log('Hubo un error al conectar')
        
    }
    
}

connectDB()
//Instancia de express
const server = express()

//Leer datos de formularios
server.use(express.json())
server.use('/api/productos',router)


export default server