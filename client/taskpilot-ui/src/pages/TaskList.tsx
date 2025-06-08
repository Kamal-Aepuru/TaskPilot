import React, { useState } from "react";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTasks } from "../api/useTasks";
import { useCategories } from "../api/useCategories";
import type { Task } from "../types/task";

export default function TaskList() {
  const queryClient = useQueryClient();

  const { data: tasks, isLoading, isError } = useTasks();
  const { data: categories } = useCategories();

  const [form, setForm] = useState({
    name: "",
    description: "",
    startDateTime: "",
    endDateTime: "",
    category: "",
    createdBy: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const formattedValue =
      type === "datetime-local" ? new Date(value).toISOString() : value;
    setForm((prev) => ({ ...prev, [name]: formattedValue }));
  };

  const addTaskMutation = useMutation({
    mutationFn: async () => {
      const payload = {
        ...form,
        category:
          form.category && form.category.length === 24 ? form.category : undefined,
      };
      const res = await axios.post("http://localhost:3030/api/tasks", payload);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      setForm({
        name: "",
        description: "",
        startDateTime: "",
        endDateTime: "",
        category: "",
        createdBy: "",
      });
    },
    onError: (error) => {
      console.error("Error creating task:", error);
    },
  });

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.startDateTime || !form.endDateTime || !form.createdBy) {
      alert("Please fill all required fields.");
      return;
    }
    addTaskMutation.mutate();
  };

  return (
    <div>
      <h2>Create New Task</h2>
      <form onSubmit={handleAddTask}>
        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} />
        <input name="description" placeholder="Description" value={form.description} onChange={handleChange} />
        <input name="startDateTime" type="datetime-local" value={form.startDateTime} onChange={handleChange} />
        <input name="endDateTime" type="datetime-local" value={form.endDateTime} onChange={handleChange} />
        <input name="createdBy" placeholder="Created By" value={form.createdBy} onChange={handleChange} />

        <select name="category" value={form.category} onChange={handleChange}>
          <option value="">Select Category</option>
          {categories?.map((cat: any) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>

        <button type="submit" disabled={addTaskMutation.isPending}>
          {addTaskMutation.isPending ? "Adding..." : "Add Task"}
        </button>
      </form>

      <h3>All Tasks</h3>
      {isLoading && <p>Loading tasks...</p>}
      {isError && <p>Failed to load tasks.</p>}

      <ul>
        {tasks?.map((task: Task) => (
          <li key={task._id}>
            <strong>{task.name}</strong> - {task.description || "No description"}<br />
            Start: {new Date(task.startDateTime).toLocaleString()}<br />
            End: {new Date(task.endDateTime).toLocaleString()}<br />
            Created By: {task.createdBy}
            <hr />
          </li>
        ))}
      </ul>
    </div>
  );
}
