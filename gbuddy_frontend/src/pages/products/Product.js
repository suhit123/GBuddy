import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import '../../css/products/product.css';
import axios from "axios";
const Product = () => {
    const { id } = useParams();
    const [product, setProduct] = useState({
        title: "",
        description: "",
        price: "",
        images: [],
    });
    const [image, setImage] = useState("");
    useEffect(() => {
        if (id) {
            const fetcher = async () => {
                const response = await fetch(
                    `http://localhost:8080/products/get?id=${id}`
                );
                const data = await response.json();
                console.log(data[0]);
                setProduct(data[0]);
                setImage(data[0].images[0]);
            };
            fetcher();
        }
    }, [id]);


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
        const res = await initializeRazorpay();
        if (!res) {
            alert("Razorpay SDK Failed to load");
            return;
        }
        let amount = product.price ;
        // Make API call to the serverless API
        const response = await axios.post("http://localhost:8080/api/razorpay", {
            amount: amount
        });
        const data = response.data;
        var options = {
            key: "rzp_test_P4936ySdvNy851", // Enter the Key ID generated from the Dashboard
            name: "GBuddy",
            currency: data.currency,
            amount: data.amount,
            order_id: data.id,
            description: "Thankyou for your test donation",
            image: 'https://blush-design.imgix.net/collections/i6aPXTYbSUdZEveWhgik/a22d18a9-6c9d-4a9e-98a8-9c77ff34a309.png?w=800&h=450&fit=crop&auto=compress&cs=srgb',
            handler: function (response) {
                // // Validate payment at server - using webhooks is a better idea. // alert(response.razorpay_payment_id);  // alert(response.razorpay_order_id);  // alert(response.razorpay_signature);
                if (response.razorpay_payment_id) {
                    //   addToOrders();
                    //   reduceQty();
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
        <div>
            <div className="productDetailedEntireContainer">
                <div className="productDetailedContainer">
                    <div className="productDetailedContainerLeft">
                        <img className="productDetailedContainerLeftMainImage" src={image} alt={product.name} />
                        <div className="productDetailedContainerLeftImages">
                            {product.images.map((img) => (
                                <div className="productDetailedContainerLeftImageDiv"><img
                                    className="productDetailedContainerLeftImage"
                                    key={img}
                                    src={img}
                                    alt={product.name}
                                    onClick={() => setImage(img)}
                                /></div>
                            ))}
                        </div>
                    </div>
                    <div className="productDetailedContainerRight">
                        <h2>{product.title}</h2>
                        <p style={{ color: 'grey', margin: 0, padding: 0 }}>Seller : {"Suhit"}</p>
                        <p>{product.description}</p>
                        <p>Price : {product.price}/-</p>
                        <div className="productDetailedContainerRightOptions">
                            <button className="productDetailedContainerRightButton">ADD TO CART</button>
                            <button className="productDetailedContainerRightButton" onClick={makePayment}>BUY NOW</button>
                        </div>
                        <button className="productDetailedContainerRightButton productDetailedContainerRightButtonChat">CHAT NOW</button>
                    </div>
                </div>
                <div className="productDetailedDisclaimer">
                    <p><span style={{ fontWeight: 600 }}>Terms and conditions : </span>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                </div>
            </div>
        </div>
    );
};
export default Product;
