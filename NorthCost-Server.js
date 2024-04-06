const express = require("express");
const fs = require("fs");
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

let counter = 72127695;

// Load the counter value from a file, if it exists
fs.readFile("counter.txt", "utf8", (err, data) => {
  if (!err) {
    counter = parseInt(data);
  }
});

// Endpoint to get the current counter value
app.get("/counter", (req, res) => {
  res.json({ counter });
});

// Endpoint to increment the counter
app.post("/increment", (req, res) => {
  counter++;
  saveCounter();
  res.json({ success: true });
});

// Increment the counter every 30 seconds
setInterval(() => {
  counter++;
  saveCounter();
}, 30000);

// Root path handler
app.get("/", (req, res) => {
  res.send(`Server is running. Current counter value: ${counter}`);
});

// Save the counter value to a file
function saveCounter() {
  fs.writeFile("counter.txt", counter.toString(), (err) => {
    if (err) {
      console.error("Failed to save counter:", err);
    }
  });
}

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
