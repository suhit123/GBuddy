import axios from "axios";
import { createContext, useCallback, useState, useEffect } from "react";
export const CartContext = createContext();
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [cartLoading, setCartLoading] = useState(false);
  const fetchCart = useCallback(async () => {
    const token = localStorage.getItem('token');
    if (token && token.length !== 0) {
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
    }
  }, []);

  const [User, setUser] = useState(null);
  const [UserLoading, setUserLoading] = useState(false);
  const fetchUser = useCallback(async () => {
    const token = localStorage.getItem('token');
    if (token && token.length !== 0) {
      try {
        setUserLoading(true);
        await axios.get(`http://localhost:8080/user/get?token=${token}`)
          .then((response) => {
            setUser(response.data);
          })
          .catch((error) => {
            console.log(error);
          })
          .finally(() => {
            setUserLoading(false);
          });
      } catch (e) {
        console.log(e);
      }
    }
  }, []);
  return (
    <CartContext.Provider value={{ cart, fetchCart, cartLoading,User,fetchUser,UserLoading }}>
      {children}
    </CartContext.Provider>
  );
}