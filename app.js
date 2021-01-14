const express = require("express");
const app = express();
require("dotenv").config();
require("./model/conn");
var cors = require("cors");
const port = 3800;
const userRouter = require("./router/user");
const categoryRouter = require("./router/category");
const passwordRouter = require("./router/password");
app.use(cors());
app.use("/api", userRouter);
app.use("/api", categoryRouter);
app.use("/api", passwordRouter);

app.get("/", (req, res) => res.send("Hello World!"));
app.listen(port, () => console.log(`Example app listening on port port!`));
