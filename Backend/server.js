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

app.get("/api/search/:searchVal", async (req, res) => {
  //   console.log(req.params);
  const { searchVal } = req.params;
  const query1 = `select * from nextwave where name LIKE ? OR country LIKE ? OR mobile LIKE ? OR email LIKE ?`;
  const details1 = await db.all(query1, [
    `%${searchVal}%`,
    `%${searchVal}%`,
    `%${searchVal}%`,
    `%${searchVal}%`,
  ]);

  const query2 = `select * from rawdata where name LIKE ? OR city LIKE ? OR customerId LIKE ? `;
  const details2 = await db.all(query2, [
    `%${searchVal}%`,
    `%${searchVal}%`,
    `%${searchVal}%`,
  ]);

  const query3 = `select * from rawdata1 where name LIKE ? OR city LIKE ? OR phone LIKE ? OR email LIKE ? OR occupation LIKE ?`;
  const details3 = await db.all(query3, [
    `%${searchVal}%`,
    `%${searchVal}%`,
    `%${searchVal}%`,
    `%${searchVal}%`,
    `%${searchVal}%`,
  ]);
  //   console.log(details1);

  const combinedDtls = [...details1, ...details2, ...details3];

  res.send({ data: combinedDtls });
});

app.post("/api/speech", async (req, res) => {
  const arr = req.body;

  arr.map(async (item) => {
    const query = `INSERT INTO speech (content) VALUES(?)`;
    await db.run(query, [item]);
  });

  res.send({ msg: "succes" });
});

app.get("/api/speech/recorded", async (req, res) => {
  const query = `SELECT * FROM speech`;
  const data = await db.all(query);
  res.send(data);
});
