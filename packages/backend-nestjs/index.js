const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());

app.use((req, res, next) => {
  console.log('Request received', req.url, req.method);
  next();
});

app.use(express.json());

app.use((req, res) => {
  res.json({
    method: req.method,
    url: req.url,
    body: req.body,
  });
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
