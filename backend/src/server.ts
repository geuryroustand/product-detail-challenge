import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import mongoose from "mongoose";
import listEndpoints from "express-list-endpoints";
import product from "./services/product/index";

const server = express();

server.use(
  cors({
    credentials: true,
  })
);

server.use(compression());
server.use(cookieParser());
server.use(bodyParser.json());

//************************ROUTERS**************************

server.use("/product", product);

http.createServer(server);

const port = 8080;

server.listen(port, async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://geury:TSN2nqlg3MgL9XCw@cluster0.8gw6mh4.mongodb.net/marketplace?retryWrites=true&w=majority"
    );

    console.table(listEndpoints(server));
    console.log("Server successfully running!" + port);
  } catch (error) {
    console.error("Db connection is failed ", error);
  }
});
