import express from "express"
import cors,{CorsOptions} from 'cors'
import router from "./router"
import db from './config/db'

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

//Cors
const corsOptions:CorsOptions = {
    origin:function(origin,callback){
        console.log('Origen recibido:', origin)
        if(origin === process.env.FRONT_URL){
            callback(null,true)
            console.log('Permitir')
        }else{
            callback(new Error('Error Cors'))
            console.log('Denegar')
        }
    }
}
server.use(cors(corsOptions))

//Leer datos de formularios
server.use(express.json())
server.use('/api/productos',router)


export default server