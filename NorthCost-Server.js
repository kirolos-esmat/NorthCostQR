const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

let counter = 0;

// Endpoint to get the current counter value
app.get("/counter", (req, res) => {
  res.json({ counter });
});

// Endpoint to increment the counter
app.post("/increment", (req, res) => {
  counter++;
  res.json({ success: true });
});

// Increment the counter every 30 seconds
setInterval(() => {
  counter++;
}, 30000);

// Root path handler
app.get("/", (req, res) => {
  res.send(`Server is running. Current counter value: ${counter}`);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
