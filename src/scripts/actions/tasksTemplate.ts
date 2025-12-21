import { Task } from "../interfaces.ts";

const tasksList = document.querySelector("#tasks-list") as HTMLUListElement;

const taskTemplate = function (data: Task) {
  return `
    <li id='${data.id.toString()}' class='task'>
      <div class='task__inner'>
        <p>${data.title.toString()}</p>
        <button class='btn btn--remove'></button>
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
