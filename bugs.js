const bugs = document.getElementById("bugs");

const reportBugButton = document.getElementById("reportBtn");

reportBugButton.addEventListener("click", () => {
  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;

  bugs.innerHTML += `<details class="bug">${description}<summary>${title}</summary></details>`;
});
