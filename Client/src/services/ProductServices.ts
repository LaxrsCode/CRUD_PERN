import { DraftProductSchema, ProductsSchema , Product, ProductSchema} from "../types"
import { safeParse  } from "valibot"
import axios from "axios"

type ProductData ={
    [k: string]: FormDataEntryValue;
}

export async function addProduct(data : ProductData) {
    try {
        const result = safeParse(DraftProductSchema,{
            name:data.name,
            price:+data.price
        })
        if(result.success){
            const url = `${import.meta.env.VITE_URL}/api/productos`

            const {data} = await axios.post(url,{
                name:result.output.name,
                price:result.output.price
            })
            return data
        } else{
            throw new Error('Datos no validos')
        }
    } catch (error) {
        console.log(error)
    }
}

export async function getProducts() {
    
    try {
        const url = `${import.meta.env.VITE_URL}/api/productos`
        const {data} = await axios(url)
        const result = safeParse(ProductsSchema,data.data)
        if(result.success){
            return result.output
        }
    } catch (error) {
        console.log(error)
    }
}

export async function getProductByID(id:Product['id']) {
    
    try {
        const url = `${import.meta.env.VITE_URL}/api/productos/${id}`
        const {data} = await axios(url)
        const result = safeParse(ProductSchema,data.data)
        if(result.success){
            return result.output
        } else{
            throw new Error('Hubo un error en la peticion')
        }
    } catch (error) {
        console.log(error)
    }
}

export async function updateProductByID(data : ProductData ,id:Product['id']) {
    
    try {

        const result = safeParse(ProductSchema,{
            id:id,
            name: data.name,
            price:Number(data.price),
            availability:Boolean(data.availability)
        })
        if(result.success){
            const url = `${import.meta.env.VITE_URL}/api/productos/${id}`
            await axios.put(url, result.output)
            console.log(result)
            return result.output
        } else{
            throw new Error('Hubo un error en la peticion')
        }
    } catch (error) {
        console.log(error)
    }
}

export async function deleteProductByID(id:Product['id']) {
    
    try {
        const url = `${import.meta.env.VITE_URL}/api/productos/${id}`
        await axios.delete(url)
        
    } catch (error) {
        console.log(error)
    }
} 