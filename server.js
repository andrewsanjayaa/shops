const express = require("express");
const path = require("path");
const app = express();

const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");
const aboutRoutes = require("./routes/aboutRoutes");
const testimoniRoutes = require("./routes/testiRoutes");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));

app.use("/api/products", productRoutes);
app.use("/users", userRoutes);
app.use("/about", aboutRoutes);
app.use("/testimonials", testimoniRoutes);


app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
