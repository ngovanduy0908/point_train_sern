export const disabledInputOfSinhVien = (checkBox) => {
  // const checkBox = document.querySelector("#checkBox");
  // checkBox.onclick = () => {
  // };
  console.log("checkBox:", checkBox);
  console.log("checkBox: vao day");
  const svMonitor = document.querySelectorAll("input[name='svMonitor']");
  for (let i = 0; i < svMonitor.length; i++) {
    svMonitor[i].disabled = true;
  }
  const ltNoRegulation = document.querySelector("input[name='ltNoRegulation']");
  ltNoRegulation.checked = true;
  console.log("ltNoRegulation: ", ltNoRegulation.checked);
};
