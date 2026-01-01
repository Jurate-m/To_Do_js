const filterConatiner = document.querySelector(".filters");

export const handleFiltersClick = function () {
  filterConatiner?.addEventListener("click", (e) => {
    const btn = e.target.closest(".btn.btn--filters");

    if (!btn) return;

    const filterList = filterConatiner.querySelector("#filters-list");

    filterList?.classList.toggle("active");
    btn?.classList.toggle("active");
  });
};
