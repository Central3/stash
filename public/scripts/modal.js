const openModalTrigger = document.querySelectorAll("[data-open-modal]");
const closeModalTrigger = document.querySelectorAll("[data-close-modal]");

openModalTrigger.forEach((trigger) => {
  trigger.addEventListener("click", (event) => {
    const modal = document.querySelector(trigger.dataset.openModal);
    modal?.showModal();
  });
});

closeModalTrigger.forEach((trigger) => {
  trigger.addEventListener("click", (event) => {
    const modal = trigger.closest("dialog");
    modal.querySelector("form")?.reset();
    modal?.close();
  });
});
