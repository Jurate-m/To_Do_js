import { DEFAULT_TASK } from "../data.js";
import { Task } from "../interfaces.ts";

export let tasks = DEFAULT_TASK.map((task: Task) => ({ ...task }));

export const addTask = function (task: Task) {
  tasks = [task, ...tasks];
};

export const filteredTasks = function (filterBy: string = "incomplete") {
  const filteredTasks =
    filterBy === "incomplete"
      ? tasks.filter((task) => !task.complete)
      : tasks.filter((task) => task.complete);

  return filteredTasks;
};

const getTask = function (id: number): Task | undefined {
  const task = tasks.find((task) => task.id === id);

  return task;
};

export const removeTask = function (id: number) {
  const task = getTask(id);

  if (!task) return;

  const taskIndex = tasks.indexOf(task);

  return tasks.splice(taskIndex, 1);
};

const shiftTaskToStart = function (id: number) {
  const [task] = removeTask(id);

  addTask(task);
};

export const toggleCompleteTask = function (id: number) {
  const task = getTask(id);

  if (!task) return;
  shiftTaskToStart(id);

  task.complete = !task.complete;
};
