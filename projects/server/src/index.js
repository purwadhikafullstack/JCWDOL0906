const { join } = require("path");
require("dotenv").config({ path: join(__dirname, "../.env") });
const express = require("express");
const cors = require("cors");
const router = require("./router");
const db = require("../src/models");
const multer = require("multer");

const PORT = process.env.PORT || 8000;
const app = express();
app.use(cors());

app.use(express.json());
app.use("/public", express.static(__dirname + "/.." + "/public"));
console.log(__dirname);
//#region API ROUTES
app.get("/api", (req, res) => {
  res.send(`Hello, this is my API`);
});

const authRouter = require("./router/authRouter");
app.use("/api/auth", authRouter);
const productRouter = require("./router/productRouter");
app.use("/api", productRouter);
// const authRouter= require("./router/authRouter");
// app.use("/api/auth", authRouter);
// const categoryRouter = require("./router/categoryRouter");
// app.use("/api", categoryRouter);
// const productRouter = require("./router/productRouter");
// app.use("/api", productRouter);

const addressRouter = require("./router/addressRouter");
app.use("/api/address", addressRouter);

app.get("/api/greetings", (req, res, next) => {
  res.status(200).json({
    message: "Hello, Student !",
  });
});

const rajaOngkirRouter = require("./router/rajaOngkirRouter");
app.use("/api/shipping", rajaOngkirRouter);
// const transactionRouter = require("./router/transactionRouter");
// app.use("api/transaction", transactionRouter);
// NOTE : Add your routes here

// for (let routes in router.routes) {
//   app.use("/api", routes);

for (routes of router.routes) {
  app.use("/api", routes);
}
// ===========================

// not found
app.use((req, res, next) => {
  if (req.path.includes("/api/")) {
    res.status(404).send("Not found !");
  } else {
    next();
  }
});

// error
app.use((err, req, res, next) => {
  if (req.path.includes("/api/")) {
    console.error("Error : ", err.stack);
    res.status(500).send("Error !");
  } else {
    next();
  }
});

//#endregion

//#region CLIENT
const clientPath = "../../client/build";
app.use(express.static(join(__dirname, clientPath)));

// Serve the HTML page
app.get("*", (req, res) => {
  res.sendFile(join(__dirname, clientPath, "index.html"));
});

//#endregion

app.listen(PORT, (err) => {
  if (err) {
    console.log(`ERROR: ${err}`);
  } else {
    // db.sequelize.sync({ alter: true });
    console.log(`APP RUNNING at ${PORT} ✅`);
  }
});
