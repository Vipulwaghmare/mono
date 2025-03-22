import express from "express";
import cors from "cors";
const app = express();
const port = 3000;

app.use(cors());
app.use((req, res, next) => {
  console.log("path", req.path);
  console.log("body", req.body);
  console.debug("method", req.method);
  return res.json({
    method: req.method,
    path: req.path,
    body: req.body,
  });
});
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
