const express = require("express");
const app = express();
const axios = require("axios");
require("dotenv").config();

const PORT = process.env.PORT || 3000;

const cors = require("cors");

app.use(cors({ origin: process.env.ORIGIN }));

// Define a route to handle GET requests
app.get("/infostat/:country", async (req, res) => {
  const country = req.params.country;
  console.log("Selected country:", country);

  let server;
  if (country == "hr") {
    server = "https://idissuer-api.akd.hr/infostat";
  } else if (country == "slo") {
    server = "https://api.idissuer.si//infostat";
  } else {
    res.status(404).send("Not Found");
  }

  try {
    const response = await axios.get(server, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
  return;
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
