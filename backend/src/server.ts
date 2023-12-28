import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

import cors from "cors";
import mongoose from "mongoose";
import listEndpoints from "express-list-endpoints";

import productRouter from "./routers/productRoutes";
import addToCartRouter from "./routers/addToCartRoutes";

const server = express();

server.use(
  cors({
    credentials: true,
  })
);

//************************MIDDLEWARES**************************

server.use(cookieParser());
server.use(bodyParser.json());

//************************ROUTERS**************************

server.use("/product", productRouter);
server.use("/cart", addToCartRouter);

http.createServer(server);

const port = 8080;

const MONGO_CONNECTION_URL =
  "mongodb+srv://geury:TSN2nqlg3MgL9XCw@cluster0.8gw6mh4.mongodb.net/marketplace?retryWrites=true&w=majority";

server.listen(port, async () => {
  try {
    await mongoose.connect(MONGO_CONNECTION_URL);

    console.table(listEndpoints(server));
    console.log("Server successfully running!" + port);
  } catch (error) {
    console.error("Db connection is failed ", error);
  }
});
