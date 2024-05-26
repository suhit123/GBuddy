import { useContext, useEffect, useState } from "react";
import "../css/nav/nav.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/cartContext";
import Loader from "./Loader";
const Nav = ({counter=0}) => {
  const navigator = useNavigate();
  const {cart,fetchCart,cartLoading}=useContext(CartContext);
  const [user, setUser] = useState("fc");
  const [openCart, setOpenCart] = useState(false);


  //loaders
  const [removeLoader, setRemoveLoader] = useState(false);

  useEffect(() => {
    const token ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NTI1ZWEwYzJmZTZiNmIxZjdhMjcxMiIsImlhdCI6MTcxNjY3NDI2NH0.1IIZd7Sy0W9pGlqS82EiGqb3R9YzFoqxOabrliiDo90";
    if (token) {
      fetchCart();
    }
  }, []);
  const removeHandler = async (id) => {
    setRemoveLoader(true);
    await axios
      .post("http://localhost:8080/products/removeFromCart", {
        token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NTI1ZWEwYzJmZTZiNmIxZjdhMjcxMiIsImlhdCI6MTcxNjY3NDI2NH0.1IIZd7Sy0W9pGlqS82EiGqb3R9YzFoqxOabrliiDo90",
        productId: id,
      })
      .then((response) => {
        console.log(response.data);
        fetchCart();
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setRemoveLoader(false);
      });
    };
  return (
    <>
      <div className="navContainer">
        <div className="navLeft">
          <button className="navLeftButton">Resources</button>
          <button className="navLeftButton" onClick={()=>navigator('/products')}>Products</button>
          <button className="navLeftButton">Roadmaps</button>
        </div>
        <div className="navMiddle">
          <h1>GBUDDY</h1>
        </div>
        {user === null ? (
          <div className="navRight">
            <button className="navRightButton">Login</button>
            <button className="navRightButton">Register</button>
          </div>
        ) : (
          <div className="navRight">
            <button className="navRightButton">Profile</button>
            <button
              className="navRightButton"
              onClick={() => setOpenCart(!openCart)}
            >
              cart
            </button>
            <button className="navRightButton">Logout</button>
          </div>
        )}
      </div>
      <div className={openCart ? "sideCartOpen" : "sideCart"}>
        <div className="closeBtnCart" onClick={() => setOpenCart(!openCart)}>
          <p>Close</p>
        </div>
        <div className="cartItemsContainer"> 
          <h1>Cart Items</h1>
          {cartLoading? <div className="productsPageLoader">
                    <img style={{width:"300px",height:"auto"}} src="https://cdn.dribbble.com/users/133424/screenshots/3708293/animacia3.gif" alt="loading" />
        </div>:cart.map((item) => {
            return (
              <div className="cartProductShow">
                <div className="cartProductShowLeft">
                  <img src={item.images[0]} alt={item.title} />
                </div>
                <div className="cartProductShowRight">
                  <h3>{item.title}</h3>
                  <p>{item.description.slice(0, 50)}...</p>
                  <p>Price : {item.price}</p>
                  <div className="removeViewButtons">
                    <button onClick={()=>{
                      removeHandler(item._id);
                    }}>{removeLoader?"Loading...":"Remove"}</button>
                    <button
                      onClick={() => {
                        navigator(`/product/${item._id}`);
                        setOpenCart(!openCart);
                      }}
                    >
                      View
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};
export default Nav;
