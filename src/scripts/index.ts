import * as createTask from "./actions/createTask.ts";
import * as tasksMutation from "./mutations/tasks.ts";
import * as tasksTemplate from "./actions/tasksTemplate.ts";

const handleTaskSumbit = function () {
  const checkInputValidity = createTask.checkIfValidInput();
  if (!checkInputValidity) return;
  const task = createTask.getTaskAttr();
  tasksMutation.addTask(task);
  tasksTemplate.renderTasks(tasksMutation.tasks);
};

const handleTaskRemove = function (id: number) {
  tasksMutation.removeTask(id);
  tasksTemplate.renderTasks(tasksMutation.tasks);
};

const handleTaskComplete = function (id: number) {
  tasksMutation.toggleCompleteTask(id);
  tasksTemplate.renderTasks(tasksMutation.tasks);
};

const init = function () {
  tasksTemplate.renderTasks(tasksMutation.tasks);
  createTask.handleSubmit(handleTaskSumbit);
  tasksTemplate.removeTask(handleTaskRemove);
  tasksTemplate.markCompleteTask(handleTaskComplete);
};

init();
