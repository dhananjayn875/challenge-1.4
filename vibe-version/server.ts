import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // In-memory store for tasks (since no DB was requested, but we want a "full stack" feel)
  let tasks = [
    { id: "1", title: "Welcome to TaskFlow!", completed: false },
    { id: "2", title: "Try adding a new task below", completed: false },
    { id: "3", title: "Mark this as complete", completed: true },
  ];

  // API Routes
  app.get("/api/tasks", (req, res) => {
    res.json(tasks);
  });

  app.post("/api/tasks", (req, res) => {
    const { title } = req.body;
    if (!title) return res.status(400).json({ error: "Title is required" });
    
    const newTask = {
      id: Math.random().toString(36).substring(7),
      title,
      completed: false,
    };
    tasks.push(newTask);
    res.status(201).json(newTask);
  });

  app.patch("/api/tasks/:id", (req, res) => {
    const { id } = req.params;
    const { completed } = req.body;
    
    tasks = tasks.map((t) => (t.id === id ? { ...t, completed: completed ?? t.completed } : t));
    const updatedTask = tasks.find((t) => t.id === id);
    res.json(updatedTask);
  });

  app.delete("/api/tasks/:id", (req, res) => {
    const { id } = req.params;
    tasks = tasks.filter((t) => t.id !== id);
    res.status(204).send();
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
