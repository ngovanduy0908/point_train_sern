export const disableListInput = () => {
  const listInput = document.querySelectorAll("input");
  const listSelect = document.querySelectorAll("select");
  listInput.forEach((inputItem) => {
    inputItem.disabled = true;
  });
  listSelect.forEach((selectItem) => {
    selectItem.disabled = true;
  });
};
