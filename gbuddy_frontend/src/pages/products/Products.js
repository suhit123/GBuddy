import axios from "axios";
import { useEffect, useState } from "react";
import '../../css/products/products.css';
import { useNavigate } from "react-router-dom";
const Products = () => {
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState("");
    const navigator=useNavigate();
    useEffect(() => {
        const fetcher = async () => {
            try {
                const response = await axios.get("http://localhost:8080/products/fetchProducts");
                setProducts(response.data);
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
        <div className="productsListContainer">
            <div>
                <input className="searchProducts" type="text" placeholder="Search Products" onChange={searchHandler}/>
            </div>
            <div className="productsList">
                {products.map((product) => {
                    return (
                        <div className="productsListItem" key={product._id}>
                           <div className="productsListItemTop"> <img src={product.images[0]} alt={product.title} /></div>
                           <div className="productsListItemBottom">
                                 <h2>{product.title}</h2>
                                 <p>{product.description.slice(0,50)}...</p>
                                 <p>Price : {product.price}/-</p>
                                <button className="productsListItemBottomButton" onClick={()=>{
                                    navigator(`/product/${product._id}`);
                                }}>View</button>
                           </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
export default Products;