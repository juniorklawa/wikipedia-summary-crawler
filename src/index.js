require("dotenv/config");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const PageSummary = require("./models/PageSummary");

const app = express();

app.use(cors());

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.get("/summary", async (req, res) => {
  const todaySummary = await PageSummary.findOne({ unique: true });

  return res.json(todaySummary);
});
 
app.listen(process.env.PORT || 3333, () => console.log('Server started 🚀'));
