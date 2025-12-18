import { Task } from "../interfaces.ts";
import { generateId } from "../helpers.ts";

const createTaskForm = document.querySelector(
  ".create-task"
) as HTMLFormElement;

const createTaskInput = createTaskForm?.querySelector(
  ".create-task__input"
) as HTMLInputElement;

const getInputValue = function () {
  const inputValue = createTaskInput.value.trim();

  return inputValue.toString();
};

export const checkIfValidInput = function () {
  const inputValue = getInputValue();

  return Boolean(inputValue);
};

export const formatedTask = function (): Task {
  const title = getInputValue();
  const id = generateId();

  return {
    title,
    id: id,
    complete: false,
  };
};

const clearInput = function () {
  createTaskInput.value = "";
};

export const handleSubmit = function (handler: { (): void; (): void }) {
  createTaskForm.addEventListener("submit", (e) => {
    e.preventDefault();
    handler();
    clearInput();
  });
};
