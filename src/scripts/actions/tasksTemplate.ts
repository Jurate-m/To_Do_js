import { Task } from "../interfaces.ts";

const btnAttributes = {
  class: ["btn", "btn--remove"],
};

const tasksList = document.querySelector("#tasks-list") as HTMLUListElement;

const taskTemplate = function (data: Task) {
  return `
    <li id='${data.id.toString()}' class='task'>
      <div class='task__inner'>
        <p>${data.title.toString()}</p>
        <button class='${[...btnAttributes.class].join(" ")}'></button>
      </div>
    </li>
  `;
};

const renderTask = function (data: Task) {
  const template = taskTemplate(data);
  tasksList?.insertAdjacentHTML("beforeend", template);
};

export const renderTasks = function (tasks: Task[]) {
  tasksList.innerHTML = "";
  tasks.map((task) => renderTask(task));
};

export const getTaskId = function (handler: {
  (id: number): void;
  (arg0: number): void;
}) {
  tasksList.addEventListener("click", (e) => {
    const task = (e.target as HTMLLIElement).closest(".task");
    const button = (e.target as HTMLButtonElement).closest(
      `.${[...btnAttributes.class].join(".")}`
    );

    if (!button || !task) return;

    const id = +task?.id;

    handler(id);
  });
};
