import {Task} from "../interfaces.ts";
import {checkLocationHash} from "../helpers.ts";
import {AVAILABLE_PATHS} from "../config.js";

const tasksContainer = document.querySelector("#tasks-list") as HTMLElement;

const errorMessages = null;

const taskTemplate = function (data: Task) {
  const id = data.id.toString();
  const title = data.title.toString();

  return `
    <li id='${id}' class='task task--${data.complete ? "complete" : "new"}'>
      <div class='task__inner'>
        <input type="checkbox" id='task-${id}' class='hidden--v' ${data.complete ? "checked" : ""}/>
        <label for='task-${id}'>${title}</label>
        <button class='btn btn--remove'></button>
      </div>
    </li>
  `;
};

const renderTask = function (data: Task) {
  const template = taskTemplate(data);

  tasksContainer.insertAdjacentHTML("beforeend", template);
};

export const renderTasks = function (tasks: Task[]) {
  tasksContainer.innerHTML = "";

  tasks.map((task) => renderTask(task));
};

const getTaskElement = function (event: Event) {
  const task = (event.target as HTMLLIElement).closest(".task");

  return task;
};

const getTaskId = function (task) {
  const taskId = +task?.id;

  return taskId;
};

const applyClass = function (event, className = "active") {
  const taskEl = getTaskElement(event);
  taskEl?.classList.add(className);
};

const eventHandler = function (event: Event, handler: (id: number) => {}) {
  const task = getTaskElement(event);
  const taskId = getTaskId(task);

  if (!task || (!taskId && taskId !== 0)) return;

  handler(taskId);
};

export const markCompleteTask = function (handler) {
  tasksContainer.addEventListener("change", (e) => {
    const path = checkLocationHash();

    if (!path) return eventHandler(e, handler);

    if (!AVAILABLE_PATHS.includes(path)) return;

    if (path === AVAILABLE_PATHS[0]) applyClass(e, "slide-right");
    if (path === AVAILABLE_PATHS[1]) applyClass(e, "slide-left");

    tasksContainer.addEventListener("animationend", () => eventHandler(e, handler), {once: true});
  });
};

export const removeTask = function (handler) {
  tasksContainer.addEventListener("click", (e) => {
    const button = (e.target as HTMLButtonElement).closest(`.btn.btn--remove`);

    if (!button) return;

    applyClass(e, "scale-down");

    tasksContainer.addEventListener("animationend", () => eventHandler(e, handler), {once: true});
  });
};
