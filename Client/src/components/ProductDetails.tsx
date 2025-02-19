import { deleteProductByID } from "../services/ProductServices";
import { Product } from "../types";
import { Link , Form , ActionFunctionArgs, redirect} from "react-router-dom";

type ProductDetailsProps = {
  product: Product;
};

export async function action({params}: ActionFunctionArgs) {

  try {
      if (!params.id || isNaN(+params.id)) {
        return redirect("/");
      }
      const id = +params.id; 
      await deleteProductByID(id);
      return redirect("/"); 
    } catch (err) {
      if (err instanceof Error) return err.message;
      return "Error desconocido";
    }
  return redirect('/')
}
export default function ProductDetails({ product }: ProductDetailsProps) {
  return (
    <tr className="border-b ">
      <td className="p-3 text-lg text-gray-800">{product.name}</td>
      <td className="p-3 text-lg text-gray-800">${product.price}</td>
      <td className="p-3 text-lg text-gray-800">
        {product.availability ? "Disponible" : "No Disponible"}
      </td>
      <td className="p-3 text-lg text-gray-800 ">
        <div className="flex gap-2 items-center">
          <Link 
            to={`/productos/${product.id}/edit`}
            className="bg-indigo-600 text-white rounded-lg w-full p-2 uppercase font-bold text-xs text-center"
          
          >Editar</Link>

          <Form className="w-full" method="POST" action={`productos/${product.id}/eliminar`} onSubmit={(e)=>{
            if(!confirm('Eliminar?')){
              e.preventDefault()
            }
          }}>
             <input type="submit" 
                value="Eliminar"
                className="bg-red-600 text-white rounded-lg w-full p-2 uppercase font-bold text-xs text-center"
             />
          </Form>
        </div>
      </td>
    </tr>
  );
}
