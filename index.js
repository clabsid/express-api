const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");

// inisialisasi body parse
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// route POST all (GET)
const postsRouter = require("./routes/posts");
app.use("/api/post", postsRouter);

// route POST store (Insert)

app.listen(port, () => {
  console.log(`app running at http://localhost:${port}`);
});
