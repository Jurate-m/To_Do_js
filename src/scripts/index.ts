import * as createTask from "./actions/createTask.ts";
import * as tasksMutation from "./mutations/tasks.ts";
import * as tasksTemplate from "./actions/tasksTemplate.ts";
import * as filters from "./actions/filters.ts";
import {AVAILABLE_PATHS} from "./config.js";
import {slicedLocationHash} from "./helpers.ts";

const handleFiltering = function () {
  const path = slicedLocationHash();
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
  tasksTemplate.renderTask(task, true);
};

const handleTaskRemove = function (id: number) {
  tasksMutation.removeTask(id);
};

const handleTaskComplete = function (id: number) {
  tasksMutation.toggleCompleteTask(id);
};

const hashChangeListener = function () {
  window.addEventListener("hashchange", () => {
    handleFiltering();
    filters.applyActiveClassToLink();
  });
};

const init = function () {
  handleFiltering();
  filters.applyActiveClassToLink();
  filters.handleFiltersClick();
  hashChangeListener();
  createTask.handleSubmit(handleTaskSumbit);
  tasksTemplate.removeTask(handleTaskRemove, handleFiltering);
  tasksTemplate.markCompleteTask(handleTaskComplete, handleFiltering);
};

init();
