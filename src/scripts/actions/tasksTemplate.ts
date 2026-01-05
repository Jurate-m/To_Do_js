import {Task} from "../interfaces.ts";
import {slicedLocationHash} from "../helpers.ts";
import {AVAILABLE_PATHS} from "../config.js";

const tasksContainer = document.querySelector("#tasks-list") as HTMLElement;

const errorMessages = null;

const taskTemplate = function (data: Task, newEl: boolean = false) {
  const id = data.id.toString();
  const title = data.title.toString();

  const liEl = document.createElement("li");
  liEl.id = id;
  liEl.classList.add("task", `task--${data.complete ? "complete" : "new"}`);

  if (newEl) {
    liEl.classList.add("scale-up");
  }

  const wrapperDiv = document.createElement("div");
  wrapperDiv.classList.add("task__inner");
  const inputEl = document.createElement("input");
  inputEl.type = "checkbox";
  inputEl.id = `task-${id}`;
  inputEl.classList.add("hidden--v");
  inputEl.checked = Boolean(data.complete);
  const labelEl = document.createElement("label");
  labelEl.htmlFor = `task-${id}`;
  labelEl.textContent = title;
  const btnEl = document.createElement("button");
  btnEl.classList.add("btn", "btn--remove");

  wrapperDiv.appendChild(inputEl);
  wrapperDiv.appendChild(labelEl);
  wrapperDiv.appendChild(btnEl);

  liEl.appendChild(wrapperDiv);

  return liEl;
};

const emptyTemplate = function (filter: string = "") {
  const h3El = document.createElement("h3");
  h3El.classList.add("tasks__empty");
  h3El.textContent = "There are currently no tasks for you. Create a new one :)";

  if (filter) h3El.textContent = `There are no ${filter} tasks`;

  return h3El;
};

const renderEmptyTemplate = function (filter: string = "") {
  const template = emptyTemplate(filter);

  tasksContainer.insertAdjacentElement("afterbegin", template);
};

export const renderTask = function (data: Task, newEl: boolean = false) {
  const template = taskTemplate(data, newEl);

  let position = "beforeend";

  if (newEl) position = "afterbegin";

  tasksContainer.insertAdjacentElement(position, template);
};

export const renderTasks = function (tasks: Task[], filter: string = "") {
  tasksContainer.innerHTML = "";

  if (!tasks.length) return renderEmptyTemplate(filter);

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

const applyActiveClass = function (event, className = "active") {
  const taskEl = getTaskElement(event);
  taskEl?.classList.add(className);
};

const toggleClass = function (event, className) {
  const taskEl = getTaskElement(event);
  taskEl?.classList.contains(className) ? taskEl?.classList.remove(className) : taskEl?.classList.add(className);
};

const eventHandler = function (event: Event, handler: (id: number) => {}) {
  const task = getTaskElement(event);
  const taskId = getTaskId(task);

  if (!task || (!taskId && taskId !== 0)) return;

  handler(taskId);
};

export const markCompleteTask = function (dataModHandler, handler) {
  tasksContainer.addEventListener("change", (e) => {
    const task = getTaskElement(e);

    toggleClass(e, "task--new");
    toggleClass(e, "task--complete");

    const path = slicedLocationHash();

    if (!path) return eventHandler(e, dataModHandler);

    if (!AVAILABLE_PATHS.includes(path)) return;

    if (path === AVAILABLE_PATHS[0]) applyActiveClass(e, "slide-right");
    if (path === AVAILABLE_PATHS[1]) applyActiveClass(e, "slide-left");

    eventHandler(e, dataModHandler);

    tasksContainer.addEventListener(
      "animationend",
      () => {
        eventHandler(e, handler);
      },
      {once: true}
    );
  });
};

export const removeTask = function (dataModHandler, handler) {
  tasksContainer.addEventListener("click", (e) => {
    const button = (e.target as HTMLButtonElement).closest(`.btn.btn--remove`);

    if (!button) return;

    applyActiveClass(e, "scale-down");

    eventHandler(e, dataModHandler);

    tasksContainer.addEventListener("animationend", () => eventHandler(e, handler), {once: true});
  });
};
