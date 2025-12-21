import * as createTask from "./actions/createTask.ts";
import * as tasksMutation from "./mutations/tasks.ts";
import * as tasksTemplate from "./actions/tasksTemplate.ts";

const handleTaskSumbit = function (): void {
  const checkInputValidity = createTask.checkIfValidInput();
  if (!checkInputValidity) return;
  const task = createTask.getTaskAttr();
  tasksMutation.addTask(task);
  tasksTemplate.renderTasks(tasksMutation.tasks);
};

const handleTaskRemove = function (id: number): void {
  tasksMutation.removeTask(id);
  tasksTemplate.renderTasks(tasksMutation.tasks);
};

const init = function (): void {
  tasksTemplate.renderTasks(tasksMutation.tasks);
  createTask.handleSubmit(handleTaskSumbit);
  tasksTemplate.getTaskId(handleTaskRemove);
};

init();
