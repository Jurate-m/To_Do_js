import * as createTask from "./actions/createTask.ts";
import * as tasksMutation from "./mutations/tasks.ts";
import * as tasksTemplate from "./actions/tasksTemplate.ts";

const handleTaskSumbit = function () {
  const checkInputValidity = createTask.checkIfValidInput();
  if (!checkInputValidity) return;
  const task = createTask.getTaskAttr();
  tasksMutation.addTask(task);
  handleTasksRender();
};

const handleTasksRender = function () {
  const incompleteTasks = tasksMutation.filteredTasks();
  const completeTasks = tasksMutation.filteredTasks("complete");
  tasksTemplate.renderTasks(incompleteTasks);
  tasksTemplate.renderTasks(completeTasks, "complete");
};

const handleTaskRemove = function (id: number) {
  tasksMutation.removeTask(id);
  handleTasksRender();
};

const handleTaskComplete = function (id: number) {
  tasksMutation.toggleCompleteTask(id);
  handleTasksRender();
};

const init = function () {
  handleTasksRender();
  createTask.handleSubmit(handleTaskSumbit);
  tasksTemplate.getTask(handleTaskRemove);
  tasksTemplate.markCompleteTask(handleTaskComplete);
};

init();
