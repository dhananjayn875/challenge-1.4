import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus, Check, Trash2, ListFilter, CheckCircle2, Circle } from "lucide-react";

interface Task {
  id: string;
  title: string;
  completed: boolean;
}

type FilterStatus = "all" | "active" | "completed";

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [filter, setFilter] = useState<FilterStatus>("all");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await fetch("/api/tasks");
      const data = await res.json();
      setTasks(data);
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const addTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    try {
      const res = await fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: newTaskTitle }),
      });
      const newTask = await res.json();
      setTasks([...tasks, newTask]);
      setNewTaskTitle("");
    } catch (error) {
      console.error("Failed to add task:", error);
    }
  };

  const toggleTask = async (id: string, completed: boolean) => {
    try {
      const res = await fetch(`/api/tasks/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: !completed }),
      });
      const updatedTask = await res.json();
      setTasks(tasks.map((t) => (t.id === id ? updatedTask : t)));
    } catch (error) {
      console.error("Failed to toggle task:", error);
    }
  };

  const deleteTask = async (id: string) => {
    try {
      await fetch(`/api/tasks/${id}`, { method: "DELETE" });
      setTasks(tasks.filter((t) => t.id !== id));
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  return (
    <div className="min-h-screen bg-[#F9FAFB] text-[#111827] font-sans selection:bg-indigo-100">
      <div className="max-w-2xl mx-auto px-4 py-12 md:py-20">
        {/* Header */}
        <header className="mb-12 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold tracking-tight mb-2 bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent"
          >
            TaskFlow
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-gray-500 font-medium"
          >
            Stay organized, stay productive.
          </motion.p>
        </header>

        {/* Input Section */}
        <motion.form 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          onSubmit={addTask}
          className="relative mb-8 group"
        >
          <input
            type="text"
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            placeholder="What needs to be done?"
            className="w-full bg-white border border-gray-200 rounded-2xl px-6 py-4 pr-16 text-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all placeholder:text-gray-400"
          />
          <button
            type="submit"
            disabled={!newTaskTitle.trim()}
            className="absolute right-2 top-2 bottom-2 px-4 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
          >
            <Plus size={24} />
          </button>
        </motion.form>

        {/* Filters */}
        <div className="flex items-center justify-between mb-6 px-2">
          <div className="flex gap-1 bg-gray-100 p-1 rounded-xl">
            {(["all", "active", "completed"] as FilterStatus[]).map((s) => (
              <button
                key={s}
                onClick={() => setFilter(s)}
                className={`px-4 py-1.5 text-sm font-semibold rounded-lg capitalize transition-all ${
                  filter === s
                    ? "bg-white text-indigo-600 shadow-sm"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
          <div className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
            <ListFilter size={14} />
            {filteredTasks.length} {filteredTasks.length === 1 ? "Task" : "Tasks"}
          </div>
        </div>

        {/* Task List */}
        <div className="space-y-3">
          {isLoading ? (
            <div className="py-12 text-center text-gray-400 animate-pulse font-medium">
              Loading your tasks...
            </div>
          ) : (
            <AnimatePresence mode="popLayout">
              {filteredTasks.map((task) => (
                <motion.div
                  key={task.id}
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className={`group flex items-center gap-4 p-4 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md hover:border-indigo-100 transition-all ${
                    task.completed ? "bg-gray-50/50" : ""
                  }`}
                >
                  <button
                    onClick={() => toggleTask(task.id, task.completed)}
                    className={`flex-shrink-0 transition-colors ${
                      task.completed ? "text-indigo-500" : "text-gray-300 hover:text-indigo-400"
                    }`}
                  >
                    {task.completed ? (
                      <CheckCircle2 size={24} className="fill-indigo-50" />
                    ) : (
                      <Circle size={24} />
                    )}
                  </button>
                  
                  <span
                    className={`flex-grow text-lg transition-all ${
                      task.completed ? "text-gray-400 line-through" : "text-gray-700"
                    }`}
                  >
                    {task.title}
                  </span>

                  <button
                    onClick={() => deleteTask(task.id)}
                    className="opacity-0 group-hover:opacity-100 p-2 text-gray-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-all"
                  >
                    <Trash2 size={18} />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          )}

          {!isLoading && filteredTasks.length === 0 && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="py-20 text-center"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 text-gray-400 mb-4">
                <Check size={32} />
              </div>
              <p className="text-gray-500 font-medium">
                {filter === "completed" 
                  ? "No completed tasks yet." 
                  : filter === "active" 
                  ? "All caught up!" 
                  : "Your task list is empty."}
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
