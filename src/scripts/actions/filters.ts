import {checkLocationHash} from "../helpers.ts";

const filterConatiner = document.querySelector(".filters");
const filterLinks = document.querySelectorAll(".filters-list__link");

export const handleFiltersClick = function () {
  filterConatiner?.addEventListener("click", (e) => {
    const btn = e.target.closest(".btn.btn--filters");

    if (!btn) return;

    const filterList = filterConatiner.querySelector("#filters-list");

    filterList?.classList.toggle("active");
    btn?.classList.toggle("active");
  });
};

export const applyActiveClassToLink = function () {
  const hash = checkLocationHash();

  for (const link of filterLinks) {
    link.classList.remove("active");
    if (link.hash === hash) link.classList.add("active");
  }
};
