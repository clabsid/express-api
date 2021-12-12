const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");

// cors
const cors = require("cors");

app.use(cors());

// inisialisasi body parse
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// route data posts (CRUD)
const postsRouter = require("./routes/posts");
app.use("/api/post", postsRouter);

app.listen(port, () => {
  console.log(`app running at http://localhost:${port}`);
});
