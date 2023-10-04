import axios from "axios";
import { createContext } from "react";

export let CartContext = createContext();

let userToken = localStorage.getItem('userToken');
let header = {
  token: userToken
};

function addToCart(id) {
  return axios.post(`https://ecommerce.routemisr.com/api/v1/cart`, {
    productId: id
  },
    {
      headers: header
    }).then((response) => response)
    .catch((error) => error)
};

function getLoggedUserCart() {
  return axios.get(`https://ecommerce.routemisr.com/api/v1/cart`,
    {
      headers: header
    }).then((response) => response)
    .catch((err) => err)
}



function removeCartItem(productId) {
  return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
    {
      headers: header
    }).then((response) => response)
    .catch((erro) => erro)
};


export default function CartContextProvider(props) {

return <CartContext.Provider value={{ addToCart, getLoggedUserCart, removeCartItem }}>
    {props.children}
  </CartContext.Provider>
}