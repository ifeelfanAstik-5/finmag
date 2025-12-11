import "dotenv/config";
import express from "express";
import { neon } from "@neondatabase/serverless";

const app = express();
app.use(express.json());

// create Neon SQL client
const sql = neon(process.env.DATABASE_URL!);

app.get("/api/test", async (req, res) => {
  try {
    const rows = await sql`SELECT NOW()`;
    res.json({ success: true, time: rows[0].now });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "DB error" });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log("Server running on http://localhost:" + PORT);
});
