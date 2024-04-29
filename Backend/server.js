const express = require("express");
const cors = require("cors");
const path = require("path");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");

require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const dbpath = path.join(__dirname, "Database.db");
let db = null;

const initializeDB = async () => {
  try {
    db = await open({ filename: dbpath, driver: sqlite3.Database });

    app.listen(process.env.PORT, () => {
      console.log(`server running at ${process.env.PORT} port`);
    });
  } catch (e) {
    console.log(e, "db error");
  }
};

initializeDB();

app.post("/api/calculator", (req, res) => {
  let { money, startDate, endDate, intrest } = req.body;
  startDate = new Date(startDate);
  endDate = new Date(endDate);

  const difference = endDate - startDate;
  const oneday = 24 * 60 * 60 * 1000;
  const days = difference / oneday;

  const dayIntrest = ((parseInt(intrest) / 100) * parseInt(money)) / 30;
  const finalIntrest = (dayIntrest * days).toFixed(2);

  res.send({ totalIntrest: finalIntrest, totalDays: days });
});

app.get("/api/data", (req, res) => {
  console.log(req.body);
  res.send({ data: "its working" });
});
