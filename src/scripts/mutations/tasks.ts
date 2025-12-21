import { DEFAULT_TASK } from "../data.js";
import { Task } from "../interfaces.ts";

export let tasks = DEFAULT_TASK.map((task: Task) => ({ ...task }));

export const addTask = function (task: Task) {
  tasks = [task, ...tasks];
};

export const removeTask = function (id: number) {
  const getTask = tasks.filter((task) => task.id === id)[0];

  const taskIndex = tasks.indexOf(getTask);

  tasks.splice(taskIndex, 1);
};
