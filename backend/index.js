import express from "express";

const PORT = 3000;
const app = express();

app.get("/", (req, res) => {
  res.json({ msg: "Hello World!" });
});

app.listen(PORT, () => {
  console.log(`app is running at http://localhost:${PORT}`);
});
