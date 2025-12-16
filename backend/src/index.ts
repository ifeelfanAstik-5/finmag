import "dotenv/config";
import express from "express";
import { PrismaClient } from "@prisma/client";

const app = express();
app.use(express.json());

const prisma = new PrismaClient();

app.get("/health", (_req, res) => res.json({ ok: true }));

app.get("/users", async (_req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

app.post("/users", async (req, res) => {
  const user = await prisma.user.create({
    data: { name: req.body.name },
  });
  res.json(user);
});

app.listen(3001, () => console.log("Backend running at http://localhost:3001"));
