const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const productRoute = require("./routes/product");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");
//const stripeRoute = require("./routes/stripe");
const cors = require("cors");

const Cart = require("./models/Cart");
const Product = require("./models/Product");
const User = require("./models/User");

dotenv.config();

mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log("DB Connection Successfull!"))
    .catch((err) => {
        console.log(err);
    });

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/carts", cartRoute);
app.use("/api/orders", orderRoute);

app.listen(process.env.PORT || 8000, () => {
    console.log("Backend server is running!");
});

app.get("/", (req, res) => {
    res.send("Welcome to Homepage");
});

app.use("/export", async (req, res) => {
    const cart = await Cart.find();
    const product = await Product.find();
    const user = await User.find();
    res.json({
        cart: cart,
        product: product,
        user: user,
    });
})