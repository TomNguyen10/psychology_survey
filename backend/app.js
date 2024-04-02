const express = require("express");
const { readdirSync } = require("fs");
const cors = require("cors");

const app = express();
require("dotenv").config();

app.use(express.json());
app.use(cors());

readdirSync("./routes").map((r) => app.use("/api", require(`./routes/${r}`)));

const server = () => {
  app.listen(1337, () => {
    console.log(`Server is running on port ${process.env.PORT || 1337}`);
  });
};

server();
