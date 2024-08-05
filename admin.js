import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-analytics.js";
import {
  getDatabase,
  ref,
  set,
  onValue,
  get,
  update,
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyCg-C0t2dLDwllNKktLTavrkOC56UgQREY",
  authDomain: "the-unclickable-button.firebaseapp.com",
  projectId: "the-unclickable-button",
  storageBucket: "the-unclickable-button.appspot.com",
  messagingSenderId: "414856785144",
  appId: "1:414856785144:web:bca19557552a1009a9df0d",
  measurementId: "G-LS39WJB6Q5",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase();
const bugs = document.getElementById("bugs");

const pass = document.getElementById("password");
const btn = document.getElementById("checkpass");

function writeBug(key, title, description) {
  const bugRef = ref(database, `/bugs/${key}`);
  
  update(bugRef, { title: title, description: description })
    .then(() => {
      alert("Bug updated successfully");
    })
    .catch((e) => {
      alert(e);
    });
}

function displayBugs() {
  const bugsRef = ref(database, "/bugs");
  onValue(bugsRef, (snapshot) => {
    const data = snapshot.val();
    bugs.innerHTML = "";

    if (data) {
      Object.entries(data).forEach(([key, bug]) => {
        const bugElement = document.createElement("details");
        bugElement.className = "bug";
        bugElement.id = `bug-${key}`; // Use unique ID for each bug

        const summary = document.createElement("summary");
        summary.textContent = bug.title;

        const description = document.createElement("p");
        description.textContent = bug.description;

        bugElement.appendChild(summary);
        bugElement.appendChild(description);

        bugs.appendChild(bugElement);

        summary.addEventListener("click", () => {
          if (!summary.textContent.includes("--- THIS BUG IS FIXED!")) {
            summary.textContent += " --- THIS BUG IS FIXED!";
            writeBug(key, summary.textContent, description.textContent);
          }
          else{
            alert("This bug is already marked as fixed")
          }
        });
      });
    } else {
      const noBugs = document.createElement("p");
      noBugs.textContent = "No bugs reported yet!";
      bugs.appendChild(noBugs);
    }
  });
}

btn.addEventListener("click", () => {
  if (pass.value == "dapa26ea") {
    pass.style.display = "none";
    btn.style.display = "none";
    displayBugs();
  } else {
    window.location.href = "/index.html";
  }
});
