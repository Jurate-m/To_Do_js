import { DEFAULT_TASK } from "../data.js";
import { Task } from "../interfaces.ts";

let tasks = DEFAULT_TASK.map((task: Task) => ({ ...task }));

export const addTask = function (task: Task) {
  tasks = [task, ...tasks];
};
