const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const productRoutes = require("./routes/productRoutes");

app.use(bodyParser.json());
app.use("/api/products", productRoutes);
app.use(express.static("public"));

app.listen(3000, () => {
  console.log("Server berjalan di http://localhost:3000");
});
