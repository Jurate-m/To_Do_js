import { Task } from "../interfaces.ts";

const btnAttributes = {
  class: ["btn", "btn--remove"],
};

const tasksContainer = document.querySelector(".tasks") as HTMLElement;

const taskTemplate = function (data: Task) {
  const id = data.id.toString();
  const title = data.title.toString();

  return `
    <li id='${id}' class='task'>
      <div class='task__inner'>
        <input type="checkbox" id='task-${id}' class='hidden--v'/>
        <label for='task-${id}'>${title}</label>
        <button class='${[...btnAttributes.class].join(" ")}'></button>
      </div>
    </li>
  `;
};

const renderTask = function (data: Task, container: HTMLElement) {
  const template = taskTemplate(data);

  container?.insertAdjacentHTML("beforeend", template);
};

export const renderTasks = function (tasks: Task[], tasksPrefix: string) {
  const container = document.querySelector(
    `#${tasksPrefix}-tasks-list`
  ) as HTMLUListElement;

  if (!container) return;

  container.innerHTML = "";

  tasks.map((task) => renderTask(task, container));
};

export const renderCompleteTasks = function () {};

const getTaskId = function (event: Event) {
  const task = (event.target as HTMLLIElement).closest(".task");

  if (!task) return;

  return +task?.id;
};

const taskEventHandler = function (event, handler) {
  const taskId = getTaskId(event);

  if (!taskId && taskId !== 0) return;

  handler(taskId);
};

export const markCompleteTask = function (handler) {
  tasksContainer.addEventListener("change", (e) => {
    taskEventHandler(e, handler);
  });
};

export const getTask = function (handler) {
  tasksContainer.addEventListener("click", (e) => {
    const button = (e.target as HTMLButtonElement).closest(
      `.${[...btnAttributes.class].join(".")}`
    );

    if (!button) return;

    taskEventHandler(e, handler);
  });
};
