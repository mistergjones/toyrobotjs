const express = require("express");
const app = express();

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// need to utilse ejs
app.set("view engine", "ejs");

// app.get("/", (req, res, next) => {
//     console.log("Here");
//     res.render("index", { text: "world" });
// });

// app.post("/", (req, res, next) => {
//     console.log(req.body);
//     // res.render("index", { text: "world" });
//     res.send("<h1>GLEN<h1>");
// });

app.listen(2999);
