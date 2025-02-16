import { createBrowserRouter } from "react-router-dom";
import Layout from "./layouts/layout";
import Products from "./pages/products";
import NewProduct,{action as newProductoAction} from "./pages/newproduct";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [{
        index:true,
        element: <Products />
    },{
        path:'productos/nuevos',
        element:<NewProduct/>,
        action:newProductoAction
    }],
  },
]);
