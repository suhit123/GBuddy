import axios from "axios";
import { useEffect, useState } from "react";
import '../../css/products/products.css';
import { useNavigate } from "react-router-dom";
import Nav from "../../components/Nav";
import Loader from "../../components/Loader";
const Products = () => {
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState("");
    const navigator = useNavigate();
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const fetcher = async () => {
            try {
                setLoading(true);
                await axios.get("http://localhost:8080/products/fetchProducts")
                    .then((response) => {

                        setProducts(response.data);
                    })
                    .catch((error) => {
                        console.log(error);
                    })
                    .finally(() => {
                        setLoading(false);
                    });
            } catch (e) {
                console.log(e);
            };
        }
        fetcher();
    }, []);
    const searchHandler = (e) => {
        setSearch(e.target.value);
        const fetcher = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/products/search?query=${e.target.value}`);
                setProducts(response.data);
            } catch (e) {
                console.log(e);
            };
        }
        fetcher();
    }
    return (
        <>
            <Nav />
            <div className="productsListContainer">
                <div>
                    <input className="searchProducts" type="text" placeholder="Search Products" onChange={searchHandler} />
                </div>
                {loading?
               <Loader/>:<div className="productsList">
                    {products.map((product) => {
                        return (
                            <div className="productsListItem" key={product._id}>
                                <div className="productsListItemTop">
                                    {product && product.images && product.images.length > 0 ? <img src={product.images[0]} alt={product.title} /> : <></>}</div>
                                <div className="productsListItemBottom">
                                    <h2>{product.title}</h2>
                                    <p>{product.description.slice(0, 50)}...</p>
                                    <p>Price : {product.price}/-</p>
                                    <button className="productsListItemBottomButton" onClick={() => {
                                        navigator(`/product/${product._id}`);
                                    }}>View</button>
                                </div>
                            </div>
                        );
                    })}
                </div>}
            </div>
            <div className="circle1"></div>
            <div className="circle2"></div>
            <div className="circle3"></div>
        </>
    );
};
export default Products;