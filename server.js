const express = require("express");
const path = require("node:path");

const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);

app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "public"));
app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");

app.get("/", (req, res) => {
  res.render("index.html");
});

app.get("/calls/create", (req, res) => {
  res.send("botafogo")
})

io.on("connection", (socket) => {
  socket.on("sendMessage", (data) => {
    console.log(data);
    io.emit("receiveMessage", data);
  });
});

server.listen(3000);
