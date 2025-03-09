import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";

export default function StudyPlanner() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [progress, setProgress] = useState(0);

  const addTask = () => {
    if (task) {
      setTasks([...tasks, { name: task, completed: false }]);
      setTask("");
    }
  };

  const completeTask = (index) => {
    const newTasks = [...tasks];
    newTasks[index].completed = !newTasks[index].completed;
    setTasks(newTasks);
    const completedTasks = newTasks.filter((t) => t.completed).length;
    setProgress((completedTasks / newTasks.length) * 100);
  };

  return (
    <div className="p-10 bg-gray-100 min-h-screen">
      <motion.h1 className="text-3xl font-bold mb-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>AI Study Planner</motion.h1>
      <Card className="p-4 bg-white shadow-lg rounded-2xl">
        <CardContent>
          <Input value={task} onChange={(e) => setTask(e.target.value)} placeholder="Enter a study task" />
          <Button onClick={addTask} className="mt-2">Add Task</Button>
          <ul className="mt-4">
            {tasks.map((t, index) => (
              <li key={index} className="flex justify-between items-center p-2 border-b">
                <span className={t.completed ? "line-through text-gray-500" : "text-black"}>{t.name}</span>
                <Button onClick={() => completeTask(index)} size="sm">
                  {t.completed ? "Undo" : "Complete"}
                </Button>
              </li>
            ))}
          </ul>
          <Progress value={progress} className="mt-4" />
        </CardContent>
      </Card>
      <Calendar className="mt-6" />
    </div>
  );
}
