const newFileDialog = document.querySelector("#newfile-dialog");
const openFileModal = document.querySelector("#open-file-modal");
const closeFileModal = document.querySelector("#close-file-modal");

const newFolderDialog = document.querySelector("#newfolder-dialog");
const openFolderModal = document.querySelector("#open-folder-modal");
const closeFolderModal = document.querySelector("#close-folder-modal");

openFileModal.addEventListener("click", () => {
  newFileDialog.showModal();
});

closeFileModal.addEventListener("click", () => {
  newFileDialog.close();
});

openFolderModal.addEventListener("click", () => {
  newFolderDialog.showModal();
});

closeFolderModal.addEventListener("click", () => {
  newFolderDialog.close();
});
