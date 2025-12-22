import * as createTask from "./actions/createTask.ts";
import * as tasksMutation from "./mutations/tasks.ts";
import * as tasksTemplate from "./actions/tasksTemplate.ts";

const handleTaskSumbit = function (): void {
  const checkInputValidity = createTask.checkIfValidInput();
  if (!checkInputValidity) return;
  const task = createTask.getTaskAttr();
  tasksMutation.addTask(task);
  tasksTemplate.renderTasks(tasksMutation.tasks, "new");
};

const handleTaskRemove = function (id: number) {
  tasksMutation.removeTask(id);
  tasksTemplate.renderTasks(tasksMutation.tasks, "new");
};

const handleTaskComplete = function (id: number) {
  tasksMutation.toggleCompleteTask(id);
};

const init = function (): void {
  tasksTemplate.renderTasks(tasksMutation.tasks, "new");
  createTask.handleSubmit(handleTaskSumbit);
  tasksTemplate.getTask(handleTaskRemove);
  tasksTemplate.markCompleteTask(handleTaskComplete);
};

init();
