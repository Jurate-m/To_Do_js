import * as createTask from "./actions/createTask.ts";
import * as tasksMutation from "./mutations/tasks.ts";
import * as tasksTemplate from "./actions/tasksTemplate.ts";
import {AVAILABLE_PATHS} from "./config.js";

const handleFiltering = function () {
  const path = window.location.hash.slice(1).trim();
  if (!path) tasksTemplate.renderTasks(tasksMutation.tasks);
  if (!AVAILABLE_PATHS.includes(path)) return;
  // throw error
  const filteredTasks = tasksMutation.filteredTasks(path);
  tasksTemplate.renderTasks(filteredTasks);
};

const handleTaskSumbit = function () {
  const checkInputValidity = createTask.checkIfValidInput();
  if (!checkInputValidity) return;
  const task = createTask.getTaskAttr();
  tasksMutation.addTask(task);
  handleFiltering();
};

const handleTaskRemove = function (id: number) {
  tasksMutation.removeTask(id);
  handleFiltering();
};

const handleTaskComplete = function (id: number) {
  tasksMutation.toggleCompleteTask(id);
  handleFiltering();
};

const hashChangeListener = function () {
  window.addEventListener("hashchange", handleFiltering);
};

const init = function () {
  handleFiltering();
  hashChangeListener();
  createTask.handleSubmit(handleTaskSumbit);
  tasksTemplate.removeTask(handleTaskRemove);
  tasksTemplate.markCompleteTask(handleTaskComplete);
};

init();
