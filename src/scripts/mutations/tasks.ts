import { DEFAULT_TASK } from "../data.js";
import { Task } from "../interfaces.ts";

export let tasks = DEFAULT_TASK.map((task: Task) => ({ ...task }));

export const addTask = function (task: Task) {
  tasks = [task, ...tasks];
};

const getTaskIndex = function (id: number): Task {
  const task = tasks.filter((task) => task.id === id)[0];

  return task;
};

export const removeTask = function (id: number) {
  const task = getTaskIndex(id);

  const taskIndex = tasks.indexOf(task);

  tasks.splice(taskIndex, 1);
};

export const toggleCompleteTask = function (id: number) {
  const task = getTaskIndex(id);

  task.complete = !task.complete;
};
