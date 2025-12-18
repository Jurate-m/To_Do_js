import * as createTask from "./actions/createTask.ts";
import * as tasks from "./mutations/tasks.ts";

const handleTaskSumbit = function (): void {
  const checkInputValidity = createTask.checkIfValidInput();

  if (!checkInputValidity) return;

  const task = createTask.formatedTask();

  tasks.addTask(task);
};

const init = function (): void {
  createTask.handleSubmit(handleTaskSumbit);
};

init();
