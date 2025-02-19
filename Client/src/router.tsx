import { createBrowserRouter } from "react-router-dom";
import Layout from "./layouts/layout";
import Products,{Loader as productsLoader} from "./pages/Products";
import NewProduct,{action as newProductoAction} from "./pages/Newproduct";
import EditProduct ,{Loader as editproductLoader , action as editProductAcion} from "./pages/EditProduct";
import { action as deleteProduct} from "./components/ProductDetails";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [{
        index:true,
        element: <Products />,
        loader: productsLoader
    },{
        path:'productos/nuevos',
        element:<NewProduct/>,
        action:newProductoAction
    },{
        path:'productos/:id/edit',
        element:<EditProduct/>,
        loader:editproductLoader,
        action: editProductAcion
    },{
        path:'productos/:id/eliminar',
        action:deleteProduct
    }],
  },
]);
