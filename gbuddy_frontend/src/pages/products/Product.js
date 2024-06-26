import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../../css/products/product.css";
import axios from "axios";
import Nav from "../../components/Nav";
import { CartContext } from "../../context/cartContext";
import Loader from "../../components/Loader";
const Product = () => {
  const navigator = useNavigate();
  const { User, fetchUser, UserLoading } = useContext(CartContext);
  const { id } = useParams();
  const { cart, fetchCart } = useContext(CartContext);
  const [addToCartLoader, setAddToCartLoader] = useState(false);
  const [dataLoading, setDataLoading] = useState(false);
  const [mobile, setMobile] = useState("");
  const [product, setProduct] = useState({
    _id: "",
    title: "",
    description: "",
    price: "",
    images: [],
    sellerId: "",
    buyerId: "",
  });
  const [image, setImage] = useState("");
  useEffect(() => {
    fetchUser();
  }, []);
  const fetcher = async () => {
    setDataLoading(true);
    await axios
      .get(`http://localhost:8080/products/get?id=${id}`)
      .then((response) => {
        const data = response.data;
        console.log(data);
        setProduct({
          _id: data._id,
          title: data.title,
          description: data.description,
          price: data.price,
          images: data.images,
          sellerId: data.sellerId,
          buyerId:
            data.buyerId && data.buyerId.length !== 0 ? data.buyerId : "",
        });
        if (data?.images) {
          setImage(data?.images?.[0]);
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setDataLoading(false);
      });
  };
  useEffect(() => {
    if (id) {
      fetcher();
    }
  }, [id]);
  const addToCart = async (id) => {
    const token = localStorage.getItem("token");
    if (!User) {
      navigator("/signup");
    }
    if (token && token.length !== 0) {
      setAddToCartLoader(true);
      await axios
        .post("http://localhost:8080/products/addToCart", {
          token,
          productId: id,
        })
        .then((response) => {
          fetchCart();
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          setAddToCartLoader(false);
        });
    }
  };
  const findMobile = async () => {
    await axios
      .get(`http://localhost:8080/user/getUserMobile?id=${product.sellerId}`)
      .then((res) => {
        console.log(res.data);
        setMobile(res.data.phone);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    if (product.sellerId !== "") {
      findMobile();
    }
  }, []);
  //payment
  const initializeRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };

      document.body.appendChild(script);
    });
  };
  const makePayment = async () => {
    if (!User) {
      navigator("/signup");
    }
    const res = await initializeRazorpay();
    if (!res) {
      alert("Razorpay SDK Failed to load");
      return;
    }
    let commission = (parseFloat(product.price) / 100) * 2;
    let intialAmount = product.price;
    let amount = product.price + (parseFloat(product.price) / 100) * 2;
    // Make API call to the serverless API
    const response = await axios.post("http://localhost:8080/api/razorpay", {
      amount: amount,
    });
    const data = response.data;
    var options = {
      key: "rzp_test_P4936ySdvNy851", // Enter the Key ID generated from the Dashboard
      name: "GBuddy",
      currency: data.currency,
      amount: data.amount,
      order_id: data.id,
      description: "Thankyou for your test donation",
      image:
        "https://blush-design.imgix.net/collections/i6aPXTYbSUdZEveWhgik/a22d18a9-6c9d-4a9e-98a8-9c77ff34a309.png?w=800&h=450&fit=crop&auto=compress&cs=srgb",
      handler: function (response) {
        // // Validate payment at server - using webhooks is a better idea. // alert(response.razorpay_payment_id);  // alert(response.razorpay_order_id);  // alert(response.razorpay_signature);
        if (response.razorpay_payment_id) {
          const handleBuyer = async () => {
            await axios
              .post("http://localhost:8080/products/updateBuyerId", {
                id,
                buyerId: User?._id,
              })
              .then((res) => [console.log(res.data)])
              .catch((err) => {
                console.log(err);
              });
          };
          const balanceUpdater = async () => {
            await axios
              .post("http://localhost:8080/user/addAmount", {
                id: product.sellerId,
                amount: intialAmount,
                commission: commission,
              })
              .then((res) => {
                console.log(res.data);
              })
              .catch((err) => {
                console.log(err);
              });
          }
          handleBuyer();
          balanceUpdater();
          window.location.reload();
          fetcher();
        } else {
          console.log("Payment failed");
        }
      },
      prefill: {
        name: "Manu Arora",
        email: "manuarorawork@gmail.com",
        contact: "9999999999",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };
  return (
    <>
      <Nav />
      <div>
        {dataLoading ? (
          <Loader />
        ) : (
          <div className="productDetailedEntireContainer">
            <div className="productDetailedContainer">
              <div className="productDetailedContainerLeft">
                <div className="productDetailedContainerLeftMainImageContainer">
                  <img
                    className="productDetailedContainerLeftMainImage"
                    src={image}
                    alt={product.name}
                  />
                </div>
                <div className="productDetailedContainerLeftImages">
                  {product.images.map((img) => (
                    <div className="productDetailedContainerLeftImageDiv">
                      <img
                        className="productDetailedContainerLeftImage"
                        key={img}
                        src={img}
                        alt={product.name}
                        onClick={() => setImage(img)}
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div className="productDetailedContainerRight">
                <h2>{product.title}</h2>
                <p
                  style={{
                    color: "grey",
                    margin: 0,
                    padding: 0,
                    cursor: "pointer",
                  }}
                >
                  Seller : {product.sellerId}
                </p>
                <p>{product.description}</p>
                <p>Price : {product.price}/- | Platform Fee : 2%</p>
                {product.sellerId !== "" && product.buyerId !== "" ? (
                  <>
                    <div>
                      <h3 style={{ color: "darkred" }}>Sold out</h3>
                    </div>
                  </>
                ) : (
                  <div className="productDetailedContainerRightOptions">
                    <button
                      className="productDetailedContainerRightButton"
                      onClick={() => addToCart(product._id)}
                    >
                      {addToCartLoader ? "Loading..." : "ADD TO CART"}
                    </button>
                    <button
                      className="productDetailedContainerRightButton"
                      onClick={makePayment}
                    >
                      BUY NOW
                    </button>
                  </div>
                )}
                <button
                  className="productDetailedContainerRightButton productDetailedContainerRightButtonChat"
                  onClick={() => {
                    const message = `Hello! Iam intrested to buy the item ${product.title}from Gbuddy store.`;
                    const encodedMessage = encodeURIComponent(message);
                    window.open(
                      `whatsapp://send?phone=${mobile}&text=${encodedMessage}`,
                      "_blank"
                    );
                  }}
                >
                  CHAT NOW
                </button>
              </div>
            </div>
            <div className="productDetailedDisclaimer">
              <p>
                <span style={{ fontWeight: 600 }}>Terms and conditions : </span>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book.
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
export default Product;
