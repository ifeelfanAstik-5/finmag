import { PrismaClient } from "@prisma/client/extension";
import "dotenv/config";
import express from "express";

const app = express();
app.use(express.json());

const prisma = new PrismaClient();

// sample API: get all users
app.get("/api/users", async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

// sample API: create a user
app.post("/api/users", async (req, res) => {
  const { name } = req.body;
  const user = await prisma.user.create({
    data: { name }
  });
  res.json(user);
});

app.listen(3001, () => console.log("Backend running at http://localhost:3001"));
