import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-analytics.js";
import {
  getDatabase,
  ref,
  set,
  onValue,
  get,
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

const bugs = document.getElementById("bugs");
const reportBugButton = document.getElementById("reportBtn");

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase();

function displayBugs() {
  const bugsRef = ref(database, "/bugs");
  onValue(bugsRef, (snapshot) => {
    const data = snapshot.val();
    bugs.innerHTML = "";

    if (data) {
      Object.entries(data).forEach(([key, bug]) => {
        const bugElement = document.createElement("details");
        bugElement.className = "bug";

        const summary = document.createElement("summary");
        summary.textContent = bug.title;

        const description = document.createElement("p");
        description.textContent = bug.description;

        bugElement.appendChild(summary);
        bugElement.appendChild(description);

        bugs.appendChild(bugElement);
      });
    } else {
      const noBugs = document.createElement("p");
      noBugs.textContent = "No bugs reported yet!";
      bugs.appendChild(noBugs);
    }
  });
}

function writeBug(title, description) {
  const bugsRef = ref(database, "/bugs");
  get(bugsRef)
    .then((snapshot) => {
      const data = snapshot.val() || {};
      const newKey = `bug${Object.keys(data).length + 1}`;

      const updates = {};
      updates[newKey] = { title: title, description: description };

      set(bugsRef, { ...data, ...updates })
        .then(() => {
          alert("Bug reported successfully");
          displayBugs();
        })
        .catch((e) => {
          alert(e);
        });
    })
    .catch((e) => {
      alert(e);
    });
}

reportBugButton.addEventListener("click", () => {
  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  writeBug(title, description);
});

displayBugs();
