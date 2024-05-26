import React, { useEffect, useState, useContext } from "react";
import {
  FormControl,
  TextField,
  Button,
  Typography,
  Box,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import Nav from "../../components/Nav";
import "../../css/products/addProduct.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../context/cartContext";

const ResourceContribute = () => {
  const navigator = useNavigate();
  const { User, fetchUser } = useContext(CartContext); // assuming CartContext provides user
  const [data, setData] = useState({
    branch: "",
    year: "",
    sem: "",
    faculty: "",
    subject: "",
    unit: "",
    userId: User ? User._id : "", // set userId from context
    document: null,
    documentType: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchUser();
    } else {
      navigator("/signup");
    }
  }, []);

  const handleChange = (field) => (event) => {
    setData({
      ...data,
      [field]: event.target.value,
    });
  };

  const handleDocumentUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setData({
        ...data,
        document: file,
        documentType: file.type,
      });
    }
  };

  const handleSubmit = async () => {
    console.log(data);
    const formData = new FormData();
    formData.append("document", data.document);
    formData.append("branch", data.branch);
    formData.append("year", data.year);
    formData.append("sem", data.sem);
    formData.append("faculty", data.faculty);
    formData.append("subject", data.subject);
    formData.append("unit", data.unit);
    formData.append("userId", data.userId);
    formData.append("documentType", data.documentType);
    await axios
      .post("http://localhost:8080/notes/addNotes", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res.data);
        navigator("/resourceOptions");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Nav />
      <div className="addProductContainer">
        <div className="addProductContainerLeft">
          <img
            src="https://cdni.iconscout.com/illustration/premium/thumb/woman-adding-product-to-cart-4268110-3550574.png?f=webp"
            alt=""
          />
        </div>
        <div className="addProductContainerRight">
          <Typography style={{fontSize:"24px"}} variant="h5" component="h1" gutterBottom align="center">
            Add a Product
          </Typography>
          <FormControl fullWidth margin="normal">
            <TextField
              size="small"
              id="branch"
              style={{ fontSize: "14px" }}
              value={data.branch}
              label="Branch"
              variant="outlined"
              onChange={handleChange("branch")}
            />
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel style={{ fontSize: 14 }} id="unit-select-label">
              Year
            </InputLabel>
            <Select
              size="small"
              id="year"
              value={data.year}
              label="Year"
              onChange={handleChange("year")}
              variant="outlined"
            >
              <MenuItem value={1}>1</MenuItem>
              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={3}>3</MenuItem>
              <MenuItem value={4}>4</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <TextField
              size="small"
              id="sem"
              style={{ fontSize: "14px" }}
              value={data.sem}
              label="Semester"
              variant="outlined"
              onChange={handleChange("sem")}
            />
          </FormControl>
          <FormControl fullWidth margin="normal">
            <TextField
              size="small"
              id="faculty"
              style={{ fontSize: "14px" }}
              value={data.faculty}
              label="Faculty"
              variant="outlined"
              onChange={handleChange("faculty")}
            />
          </FormControl>
          <FormControl fullWidth margin="normal">
            <TextField
              size="small"
              id="subject"
              style={{ fontSize: "14px" }}
              value={data.subject}
              label="Subject"
              variant="outlined"
              onChange={handleChange("subject")}
            />
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel style={{ fontSize: 14 }} id="unit-select-label">
              Unit
            </InputLabel>
            <Select
              size="small"
              id="unit"
              value={data.unit}
              label="Unit"
              onChange={handleChange("unit")}
              variant="outlined"
            >
              <MenuItem value={1}>1</MenuItem>
              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={3}>3</MenuItem>
              <MenuItem value={4}>4</MenuItem>
              <MenuItem value={5}>5</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <Button
              style={{
                height: "200px",
                backgroundColor: "white",
                color: "black",
                border: "1px dashed grey",
              }}
              variant="contained"
              component="label"
            >
              Upload Document
              <input type="file" hidden onChange={handleDocumentUpload} />
            </Button>
          </FormControl>
          {data.document && (
            <Box marginTop={2}>
              <Typography variant="body1">
                Document uploaded: {data.document.name}
              </Typography>
            </Box>
          )}
          <FormControl fullWidth>
            <Button
              style={{
                backgroundColor: "black",
                padding: "10px",
                marginBottom: "50px",
              }}
              variant="contained"
              color="primary"
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </FormControl>
        </div>
      </div>
    </>
  );
};

export default ResourceContribute;
