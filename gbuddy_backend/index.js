
const user=require("./routes/users");
const connect = require("./db");
const express = require('express');
const swaggerUI = require("swagger-ui-express");
const swaggerSpec = require("./swagger");
const app = express();
const port = 4001;
connect.connectwithdb();
const cors = require('cors');
app.use(cors(
    {
        origin: '*'
    }

));

app.use("/swagger", swaggerUI.serve, swaggerUI.setup(swaggerSpec));
app.use(express.json());
app.use('/user',user.route);


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
