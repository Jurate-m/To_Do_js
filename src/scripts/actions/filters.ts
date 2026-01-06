import {checkLocationHash} from "../helpers.ts";

const filterConatiner = document.querySelector(".filters");
const filterLinks = document.querySelectorAll(".filters-list__link");

export const handleFiltersClick = function () {
  filterConatiner?.addEventListener("click", (e) => {
    const btn = e.target.closest(".btn.btn--filters");

    if (!btn) return;

    const filterList = filterConatiner.querySelector("#filters-list");
    filterList?.classList.toggle("active");

    for (const link of filterLinks) {
      link.tabIndex = link.tabIndex < 0 ? 0 : -1;
    }

    btn.classList.toggle("active");

    btn.ariaPressed = btn.ariaPressed === "false";
  });
};

export const applyActiveClassToLink = function () {
  const linkHash = checkLocationHash();
  for (const link of filterLinks) {
    link.classList.remove("active");
    if (!linkHash && link.getAttribute("href") === "#") link.classList.add("active");
    if (link.getAttribute("href") === linkHash) link.classList.add("active");
  }
};
