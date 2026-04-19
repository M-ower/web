require("dotenv").config();
const express = require("express");
const { Pool } = require("pg");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

app.get("/api/v1/car_parts", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM car_parts ORDER BY id ASC");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/v1/categories", async (req, res) => {
  try {
    const result = await pool.query("SELECT DISTINCT category FROM car_parts");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/v1/car_parts/category/:category", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM car_parts WHERE category = $1 LIMIT 1",
      [req.params.category]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/v1/car_parts/:id", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM car_parts WHERE id = $1",
      [req.params.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Part not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/v1/car_parts", async (req, res) => {
  try {
    const { name, category, price, stock_quantity } = req.body;

    const result = await pool.query(
      "INSERT INTO car_parts (name, category, price, stock_quantity) VALUES ($1,$2,$3,$4) RETURNING *",
      [name, category, price, stock_quantity]
    );

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put("/api/v1/car_parts/:id", async (req, res) => {
  try {
    const { name, category, price, stock_quantity } = req.body;

    const result = await pool.query(
      "UPDATE car_parts SET name=$1, category=$2, price=$3, stock_quantity=$4 WHERE id=$5 RETURNING *",
      [name, category, price, stock_quantity, req.params.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Part not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});