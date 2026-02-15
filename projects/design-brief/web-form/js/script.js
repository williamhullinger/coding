

//hide text area for "other" checkbox with BEM
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".js-other-toggle").forEach((cb) => {
    const block = cb.closest(".form__option");
    const ta = block?.querySelector(".js-other-details");
    if (!ta) return;

    const sync = () => {
      ta.classList.toggle("form__textarea--hidden", !cb.checked);
      if (!cb.checked) ta.value = "";
    };

    cb.addEventListener("change", sync);
    sync();
  });
});



