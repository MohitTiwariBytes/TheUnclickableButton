// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-analytics.js";
import {
  getDatabase,
  ref,
  set,
  onValue,
  get,
  push,
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyD3GsDpEhDGxT5t1Pp5Xv9Q8pSCZdptaLY",
  authDomain: "theunclickablebutton.firebaseapp.com",
  projectId: "theunclickablebutton",
  storageBucket: "theunclickablebutton.appspot.com",
  messagingSenderId: "622641247499",
  appId: "1:622641247499:web:b4c966abc89cbe0a52de0e",
  measurementId: "G-EH8FXR5HGZ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase();

const button = document.getElementById("button");
const button1 = document.getElementById("btn");
const middle = document.getElementById("middle");
const commentText = document.getElementById("commentText");
const right = document.getElementById("right");
const comments = document.getElementById("comments");

const username = prompt("What is your name?");
let alerted = false;

function writeWinnerData(name) {
  const winnersRef = ref(database, "winners");

  get(winnersRef)
    .then((snapshot) => {
      const data = snapshot.val() || {};
      const newKey = `winner${Object.keys(data).length + 1}`;

      const updates = {};
      updates[newKey] = name;

      set(winnersRef, { ...data, ...updates })
        .then(() => {
          displayWinners();
        })
        .catch((e) => {
          alert(e);
        });
    })
    .catch((e) => {
      alert(e);
    });
}

function displayWinners() {
  const winnersRef = ref(database, "winners");
  onValue(winnersRef, (snapshot) => {
    const data = snapshot.val();
    right.innerHTML = "";

    if (data) {
      right.innerHTML += `<h1 class=${"topLeft"}>Winners</h1>
                          <div id="hello" class="hello"> </div>`;
      const hello = document.getElementById("hello");

      const sortedWinners = Object.entries(data).sort(([keyA], [keyB]) => {
        const numA = parseInt(keyA.replace(/\D/g, ""), 10);
        const numB = parseInt(keyB.replace(/\D/g, ""), 10);
        return numA - numB;
      });

      sortedWinners.forEach(([key, winner]) => {
        const p = document.createElement("p");
        p.textContent = winner;
        p.className = "comment";
        right.appendChild(p);
      });
    } else {
      right.innerHTML += `<h1 class=${"topLeft"}>Winners</h1>
                          <div id="hello" class="hello"> </div>`;
      const hello = document.getElementById("hello");
      const p = document.createElement("p");
      p.textContent = "No winners yet!";
      p.className = "comment";
      right.appendChild(p);
    }
  });
}

function writeComment(comment) {
  const commentsRef = ref(database, "/comments");
  get(commentsRef)
    .then((snapshot) => {
      const data = snapshot.val() || {};
      const newKey = `comment${Object.keys(data).length + 1}`;

      const updates = {};
      updates[newKey] = comment;

      set(commentsRef, { ...data, ...updates })
        .then(() => {
          displayComments();
        })
        .catch((e) => {
          alert(e);
        });
    })
    .catch((e) => {
      alert(e);
    });
}

function displayComments() {
  const commentsRef = ref(database, "/comments");
  onValue(commentsRef, (snapshot) => {
    const data = snapshot.val();
    comments.innerHTML = "";

    if (data) {
      comments.innerHTML += `<h1 class=${"topLeft"}>Comments</h1>
                          <div id="hello" class="hello"> </div>`;
      const hello = document.getElementById("hello");

      // Convert data to an array of [key, value] pairs
      const sortedComments = Object.entries(data).sort(([keyA], [keyB]) => {
        // Extract numbers and sort by them
        const numA = parseInt(keyA.replace(/\D/g, ""), 10);
        const numB = parseInt(keyB.replace(/\D/g, ""), 10);
        return numA - numB;
      });

      sortedComments.forEach(([key, comment]) => {
        const p = document.createElement("p");
        p.textContent = comment;
        p.className = "comment";
        comments.appendChild(p);
      });
    } else {
      comments.innerHTML += `<h1 class=${"topLeft"}>Comments</h1>
                          <div id="hello" class="hello"> </div>`;
      const hello = document.getElementById("hello");
      const p = document.createElement("p");
      p.textContent = "No comments yet!";
      p.className = "comment";
      comments.appendChild(p);
    }
  });
}

displayWinners();
displayComments();

button1.addEventListener("mouseover", () => {
  const width = middle.clientWidth;
  const height = middle.clientHeight;

  const buttonWidth = button.offsetWidth;
  const buttonHeight = button.offsetHeight;

  const randomX = Math.floor(Math.random() * (width - buttonWidth));
  const randomY = Math.floor(Math.random() * (height - buttonHeight));
});

button1.addEventListener("click", () => {
  alert("You clicked me!");
  writeWinnerData(username);
});

commentText.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    writeComment(username + ": " + commentText.value);
    commentText.value = "";
  }
});

comments.addEventListener("click", () => {
  commentText.style.opacity = 0;
  if (alerted != true) {
    alert(
      "Click on the comment section to hide the comment input and then Press `C` to comment again"
    );
    alerted = true;
  }
});

window.addEventListener("keypress", (e) => {
  if (e.key === "c") {
    commentText.style.opacity = 1;
  }
});
