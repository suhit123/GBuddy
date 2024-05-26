import { useContext, useEffect, useState } from "react";
import "../css/nav/nav.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/cartContext";

const Nav = ({ counter = 0 }) => {
  const navigate = useNavigate();
  const { User, fetchUser } = useContext(CartContext);
  const { cart, fetchCart, cartLoading } = useContext(CartContext);
  const [openCart, setOpenCart] = useState(false);
  const [removeLoader, setRemoveLoader] = useState({});

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (cart.length === 0) fetchCart();
    fetchUser();
  }, [fetchCart, fetchUser, cart.length, navigate]);

  const removeHandler = async (id) => {
    setRemoveLoader((prev) => ({ ...prev, [id]: true }));
    const token = localStorage.getItem("token");
    if (!token) return navigate("/signup");

    try {
      const response = await axios.post("http://localhost:8080/products/removeFromCart", {
        token,
        productId: id,
      });
      console.log(response.data);
      fetchCart();
    } catch (error) {
      console.log(error);
    } finally {
      setRemoveLoader((prev) => ({ ...prev, [id]: false }));
    }
  };

  const handleNavigate = (path) => {
    navigate(path);
    setOpenCart(false);
  };

  return (
    <>
      <div className="navContainer">
        <div className="navLeft">
          <button className="navLeftButton" onClick={()=>handleNavigate('/resourceOptions')}>Resources</button>
          <button className="navLeftButton" onClick={() => handleNavigate('/products')}>Products</button>
        </div>
        <div className="navMiddle">
          <h1>GBUDDY</h1>
        </div>
        {User === null ? (
          <div className="navRight">
            <button className="navRightButton" onClick={() => navigate("/signup")}>Login</button>
            <button className="navRightButton" onClick={() => navigate("/register")}>Register</button>
          </div>
        ) : (
          <div className="navRight">
            <button className="navRightButton" onClick={() => navigate("/profile")}>Profile</button>
            <button className="navRightButton" onClick={() => setOpenCart(!openCart)}>Cart</button>
            <button className="navRightButton" onClick={() => {
              localStorage.removeItem("token");
              navigate("/signup");
            }}>Logout</button>
          </div>
        )}
      </div>
      <div className={openCart ? "sideCartOpen" : "sideCart"}>
        <div className="closeBtnCart" onClick={() => setOpenCart(!openCart)}>
          <p>Close</p>
        </div>
        <div className="cartItemsContainer">
          <h1>Cart Items</h1>
          {cartLoading ? (
            <div className="productsPageLoader">
              <img style={{ width: "300px", height: "auto" }} src="https://cdn.dribbble.com/users/133424/screenshots/3708293/animacia3.gif" alt="loading" />
            </div>
          ) : cart.length === 0 ? (
            <div className="emptyGif">
              <img style={{ width: "300px", height: "auto" }} src={require('../images/6xif3w7YCH.gif')} alt="img" />
            </div>
          ) : (
            cart.map((item) => (
              <div key={item._id} className="cartProductShow">
                <div className="cartProductShowLeft">
                  <img src={item.images[0]} alt={item.title} />
                </div>
                <div className="cartProductShowRight">
                  <h3>{item.title}</h3>
                  <p>{item.description.slice(0, 50)}...</p>
                  <p>Price : {item.price}</p>
                  <div className="removeViewButtons">
                    <button onClick={() => removeHandler(item._id)}>
                      {removeLoader[item._id] ? "Loading..." : "Remove"}
                    </button>
                    <button onClick={() => handleNavigate(`/product/${item._id}`)}>View</button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default Nav;
