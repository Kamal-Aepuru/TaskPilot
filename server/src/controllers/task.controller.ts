import { Request, Response } from "express";
import { TaskSchema } from "../schemas/task.schema";
import { TaskModel } from "../models/task.model";

export const createTask = async(req:Request, res:Response) => {
    const parsed = TaskSchema.safeParse(req.body);
    if(!parsed.success){
        return res.status(400).json({error:parsed.error.flatten()});
    }

    try{
        const task = new TaskModel(parsed.data);
        await task.save();
        res.status(200).json(task)
    }catch(err:any){
        console.error("Mongoose error:", err);
        res.status(500).json({ error: `Failed to create task: ${err.message}` });
    }
};


export const getTasks = async(_req:Request, res:Response) => {
    try{
        const tasks = await TaskModel.find().sort({ createdAt:-1});
        if(!tasks) return res.status(404).json({error:"no tasks found!"})
        res.status(200).json(tasks);
    }catch(err:any){
        res.status(500).json({error:`Failed to fetch tasks:${err.message}`})
    }
};

export const getTaskById = async(req:Request,res:Response) => {
    try{
        const task = await TaskModel.findById(req.params.id);
        if(!task) return res.status(404).json({error:"No task found!"});

        res.status(200).json(task)
    }catch(err:any){
        res.status(500).json({error:`Failed to fetch task:${err.message}`})
    }
}

export const updateTask = async(req:Request,res:Response) => {
    const parsed = TaskSchema.safeParse(req.body);
    if(!parsed.success){
        return res.status(400).json({error:parsed.error.flatten()})
    }

    try{
        const updated = await TaskModel.findByIdAndUpdate(req.params.id, parsed.data,{new: true});
        if(!updated) return res.status(404).json({error:"no task found!"});

        res.status(200).json(updated)
    }catch(err:any){
        res.status(500).json({error:`Failed to update the task:${err.message}`})
    }
}

export const deleteTask = async(req:Request, res: Response) => {
    try{
        const deleted = await TaskModel.findByIdAndDelete(req.params.id);
        if(!deleted) return res.status(404).json({ error: "Task not found!"});

        res.status(200).json({message:"Task deleted successfully", deleted});
    }catch(err:any){
        res.status(500).json({error:`failed to delete task:${err.message}`})
    }
};