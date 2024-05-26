import React, { useEffect, useState } from "react";
import { FormControl, TextField, Button, Typography, Box } from "@mui/material";
import Nav from "../../components/Nav";
import "../../css/products/addProduct.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const navigator=useNavigate();
  const [data, setData] = useState({
    title: "",
    description: "",
    images: [],
    price: 0,
    sellerId: "",
  });
  const [user, setUser] = useState({
    id: '',
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const userFetcher = async () => {
        await axios.get(`http://localhost:8080/user/get?token=${token}`)
          .then((res) => {
            setUser(res.data);
            console.log(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
      };
      userFetcher();
    }
  }, []);

  const handleChange = (field) => (event) => {
    setData({
      ...data,
      [field]: event.target.value,
    });
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setData((prevData) => ({
        ...prevData,
        images: [...prevData.images, reader.result],
      }));
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    const productData = {
      ...data,
      sellerId: user._id, // Ensure the sellerId is set to the user's ID
    };
    console.log(productData)
    axios.post("http://localhost:8080/products/addProduct", productData)
      .then((response) => {
        console.log(response.data);
        navigator('/products');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Nav />
      <div className="addProductContainer">
      <div className="addProductContainerLeft">
        <img src="https://cdni.iconscout.com/illustration/premium/thumb/woman-adding-product-to-cart-4268110-3550574.png?f=webp" alt=""/>
      </div>
      <div className="addProductContainerRight">
        <Typography variant="h5" component="h1" gutterBottom align="center">
          Add a Product
        </Typography>
        <FormControl fullWidth margin="normal">
          <TextField
            size="small"
            id="title"
            style={{ fontSize: "14px" }}
            value={data.title}
            label="Product Title"
            variant="outlined"
            onChange={handleChange("title")}
          />
        </FormControl>
        <FormControl fullWidth margin="normal">
          <TextField
            size="small"
            id="description"
            style={{ fontSize: "14px" }}
            value={data.description}
            label="Product Description"
            variant="outlined"
            multiline={true}
            onChange={handleChange("description")}
          />
        </FormControl>
        <FormControl fullWidth margin="normal">
          <TextField
            size="small"
            id="price"
            style={{ fontSize: "14px" }}
            value={data.price}
            label="Price"
            variant="outlined"
            onChange={handleChange("price")}
            type="number"
          />
        </FormControl>
        <FormControl fullWidth margin="normal">
          <Button style={{ height: "200px", backgroundColor: 'white', color: 'black', border: "1px dashed grey" }} variant="contained" component="label">
            Upload Image
            <input type="file" hidden onChange={handleImageUpload} />
          </Button>
        </FormControl>
        {data.images.length > 0 && (
          <Box marginTop={2}>
            <Typography variant="body1">
              {data.images.length} image(s) uploaded:
            </Typography>
            <Box display="flex" flexWrap="wrap" gap={2} marginTop={1} marginBottom={2}>
              {data.images.map((image, index) => (
                <div style={{
                    width: "100px",
                    height: "130px",
                  }}><img
                  key={index}
                  src={image}
                  alt={`Uploaded ${index + 1}`}
                  style={{
                    width: "100px",
                    height: "auto",
                    objectFit: "cover",
                  }}
                />
                </div>
              ))}
            </Box>
          </Box>
        )}
        <FormControl fullWidth>
          <Button style={{ backgroundColor: 'black', padding: "10px",marginBottom:"50px" }} variant="contained" color="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </FormControl>
      </div>
      </div>
    </>
  );
};

export default AddProduct;
