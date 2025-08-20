const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const userRoutes = require("./routes/user.js");
const productRoutes = require("./routes/product.js");
const orderRoutes = require("./routes/order.js");

const app = express();

const corsOptions = {
  origin: "https://dazzling-cuchufli-675cf0.netlify.app",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

app.use(userRoutes);
app.use(productRoutes);
app.use(orderRoutes);

const PORT = 4000; // important pour code.run

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  })
  .catch(err => console.error("MongoDB connection error:", err));

app.all("*", (req, res) => {
  res.status(404).json({ message: "This route does not exist" });
});
