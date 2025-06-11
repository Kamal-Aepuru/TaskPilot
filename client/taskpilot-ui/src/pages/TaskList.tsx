import React, { useState } from "react";
import axios from "axios";
import { z } from "zod";
import { TaskSchema } from "../schemas/taskSchema"; // <-- Adjust path if needed
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTasks } from "../api/useTasks";
import { useCategories } from "../api/useCategories";
import { useDeleteTask } from "../api/useDelete";
import { useUpdateTask } from "../api/useUpdateTask";
import type { Task } from "../types/task";
import { Link } from "@tanstack/react-router";

export default function TaskList() {
  const queryClient = useQueryClient();
  const { data: tasks, isLoading, isError } = useTasks();
  const { data: categories } = useCategories();
  const deleteTaskMutation = useDeleteTask();
  const updateTaskMutation = useUpdateTask();

  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: "",
    description: "",
    startDateTime: "",
    endDateTime: "",
    category: "",
    createdBy: "",
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const result = TaskSchema.safeParse({
      ...form,
      startDateTime: new Date(form.startDateTime),
      endDateTime: new Date(form.endDateTime),
    });

    if (!result.success) {
      const errors: Record<string, string> = {};
      for (const [key, val] of Object.entries(result.error.flatten().fieldErrors)) {
        if (val) errors[key] = val[0];
      }
      setFormErrors(errors);
      return false;
    }

    setFormErrors({});
    return true;
  };

  const addTaskMutation = useMutation({
    mutationFn: async () => {
      const payload = {
        ...form,
        startDateTime: new Date(form.startDateTime),
        endDateTime: new Date(form.endDateTime),
        category:
          form.category && form.category.length === 24
            ? form.category
            : undefined,
      };
      const res = await axios.post("http://localhost:3030/api/tasks", payload);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      resetForm();
    },
    onError: (error) => {
      console.error("Error creating task:", error);
    },
  });

  const handleAddOrUpdateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    if (editingTaskId) {
      updateTaskMutation.mutate(
        { id: editingTaskId, updatedTask: form },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["tasks"] });
            resetForm();
          },
        }
      );
    } else {
      addTaskMutation.mutate();
    }
  };

  const handleEdit = (task: Task) => {
    setForm({
      name: task.name,
      description: task.description || "",
      startDateTime: new Date(task.startDateTime).toISOString().slice(0, 16),
      endDateTime: new Date(task.endDateTime).toISOString().slice(0, 16),
      category: task.category || "",
      createdBy: task.createdBy,
    });
    setEditingTaskId(task._id);
  };

  const resetForm = () => {
    setForm({
      name: "",
      description: "",
      startDateTime: "",
      endDateTime: "",
      category: "",
      createdBy: "",
    });
    setEditingTaskId(null);
    setFormErrors({});
  };

  return (
    <div>
      <h2>{editingTaskId ? "Edit Task" : "Create New Task"}</h2>
      <form onSubmit={handleAddOrUpdateTask}>
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
        />
        {formErrors.name && <p style={{ color: "red" }}>{formErrors.name}</p>}

        <input
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
        />

        <input
          name="startDateTime"
          type="datetime-local"
          value={form.startDateTime}
          onChange={handleChange}
        />
        {formErrors.startDateTime && (
          <p style={{ color: "red" }}>{formErrors.startDateTime}</p>
        )}

        <input
          name="endDateTime"
          type="datetime-local"
          value={form.endDateTime}
          onChange={handleChange}
        />
        {formErrors.endDateTime && (
          <p style={{ color: "red" }}>{formErrors.endDateTime}</p>
        )}

        <input
          name="createdBy"
          placeholder="Created By"
          value={form.createdBy}
          onChange={handleChange}
        />
        {formErrors.createdBy && (
          <p style={{ color: "red" }}>{formErrors.createdBy}</p>
        )}

        <select name="category" value={form.category} onChange={handleChange}>
          <option value="">Select Category</option>
          {categories?.map((cat: any) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>

        <button type="submit">
          {editingTaskId
            ? updateTaskMutation.isPending
              ? "Updating..."
              : "Update Task"
            : addTaskMutation.isPending
            ? "Adding..."
            : "Add Task"}
        </button>
      </form>

      <h3>All Tasks</h3>
      {isLoading && <p>Loading tasks...</p>}
      {isError && <p>Failed to load tasks.</p>}

      <ul>
        {tasks?.map((task: Task) => (
          <li key={task._id}>
            <Link to="/tasks/$taskId" params={{ taskId: task._id }}>
              <strong>{task.name}</strong>
            </Link>
            <br />
            {task.description || "No description"}
            <br />
            Start: {new Date(task.startDateTime).toLocaleString()}
            <br />
            End: {new Date(task.endDateTime).toLocaleString()}
            <br />
            Created By: {task.createdBy}
            <br />
            <button onClick={() => handleEdit(task)}>✏️ Edit</button>
            <button
              onClick={() => deleteTaskMutation.mutate(task._id)}
              disabled={deleteTaskMutation.isPending}
            >
              🗑️ Delete
            </button>
            <hr />
          </li>
        ))}
      </ul>
    </div>
  );
}
