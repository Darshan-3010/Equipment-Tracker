const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();
app.use(cors());
app.use(express.json());

const FILE = "./equipment.json";

/* Read JSON file */
const readData = () => {
  const data = fs.readFileSync(FILE);
  return JSON.parse(data);
};

/* Write JSON file */
const writeData = (data) => {
  fs.writeFileSync(FILE, JSON.stringify(data, null, 2));
};

/* GET all equipment */
app.get("/api/equipment", (req, res) => {
  res.json(readData());
});

/* ADD equipment */
app.post("/api/equipment", (req, res) => {
  const equipment = readData();
  const newItem = {
    id: Date.now(),
    ...req.body
  };
  equipment.push(newItem);
  writeData(equipment);
  res.json({ message: "Equipment added" });
});

/* UPDATE equipment */
app.put("/api/equipment/:id", (req, res) => {
  const equipment = readData();
  const index = equipment.findIndex(e => e.id == req.params.id);

  if (index === -1) return res.status(404).json({ message: "Not found" });

  equipment[index] = { id: equipment[index].id, ...req.body };
  writeData(equipment);
  res.json({ message: "Equipment updated" });
});

/* DELETE equipment */
app.delete("/api/equipment/:id", (req, res) => {
  let equipment = readData();
  equipment = equipment.filter(e => e.id != req.params.id);
  writeData(equipment);
  res.json({ message: "Equipment deleted" });
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
