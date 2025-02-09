import { Request, Response } from "express";
import Product from "../models/product-model";
import { check, validationResult , param} from "express-validator";
import { handleInputErrors } from "../middleware";


export const getProducts = async (req: Request, res: Response) =>{
    try {
        const products = await Product.findAll();
        res.json({ data: products });
        
      } catch (error) {
        console.log(error)
      }
}

export const getProductById = [
    // Validación del parámetro 'id'
    param('id').isInt().withMessage('ID no válido'),

    handleInputErrors,

    // Lógica del controlador
    async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const product = await Product.findByPk(id);

            if (!product) {
                return res.status(404).json({ error: 'Producto No Encontrado' });
            }

            res.json({ data: product });
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }
];

export const createProduct = async (req: Request, res: Response) => {
  //Validacion
  await check("name")
    .notEmpty()
    .withMessage("El nombre de prodcuto no puede ir vacio")
    .run(req);
  await check("price")
    .isNumeric()
    .withMessage("Valor no valido")
    .notEmpty()
    .withMessage("El precio de producto no puede ir vacio")
    .custom((valor) => valor > 0)
    .withMessage("El precio tiene que se mayor a 0")
    .run(req);
    //Errores
  handleInputErrors;
  try {
    const product = await Product.create(req.body);
    res.json({ data: product });
    
  } catch (error) {
    console.log(error)
  }
 
};

export const putProductById = [
    // Validación del parámetro 'id'
    param('id').isInt().withMessage('ID no válido'),

    handleInputErrors,

    // Lógica del controlador
    async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const product = await Product.findByPk(id);

            if (!product) {
                return res.status(404).json({ error: 'Producto No Encontrado' });
            }

            //Actualizar
            await product.update(req.body)
            await product.save()

            res.json({ data: product });
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }
];

export const deleteProductById = [
    // Validación del parámetro 'id'
    param('id').isInt().withMessage('ID no válido'),

    handleInputErrors,

    // Lógica del controlador
    async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const product = await Product.findByPk(id);

            if (!product) {
                return res.status(404).json({ error: 'Producto No Encontrado' });
            }

            //Eliminar
            await product.destroy()
           
            res.json({ data: 'Producto Eliminado' });
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }
];