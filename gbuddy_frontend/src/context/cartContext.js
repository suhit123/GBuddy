import axios from "axios";
import { createContext,useCallback,useState,useEffect } from "react";
export const CartContext = createContext();
export const CartProvider = ({ children }) => {
    const [cart,setCart] = useState([]);
    const [cartLoading,setCartLoading] = useState(false);
    const fetchCart = useCallback(async () => {
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NTI1ZWEwYzJmZTZiNmIxZjdhMjcxMiIsImlhdCI6MTcxNjY3NDI2NH0.1IIZd7Sy0W9pGlqS82EiGqb3R9YzFoqxOabrliiDo90";
        try {
            setCartLoading(true);
            await axios.post(
              "http://localhost:8080/products/fetchCart",
              {
                token,
              }
            )
            .then((response) => {
                setCart(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                setCartLoading(false);
            });
          } catch (e) {
            console.log(e);
          }
    },[]);
    return (
        <CartContext.Provider value={{ cart,fetchCart,cartLoading }}>
            {children}
        </CartContext.Provider>
    );
}