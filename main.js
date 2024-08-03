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

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD3GsDpEhDGxT5t1Pp5Xv9Q8pSCZdptaLY",
  authDomain: "theunclickablebutton.firebaseapp.com",
  projectId: "theunclickablebutton",
  storageBucket: "theunclickablebutton.appspot.com",
  messagingSenderId: "622641247499",
  appId: "1:622641247499:web:b4c966abc89cbe0a52de0e",
  measurementId: "G-EH8FXR5HGZ",
};

const button = document.getElementById("button");
const button1 = document.getElementById("btn");
const middle = document.getElementById("middle");
const commentText = document.getElementById("commentText");
const right = document.getElementById("right");
const comments = document.getElementById("comments");

const username = prompt("What is your name?");

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase();

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
      Object.values(data).forEach((winner) => {
        const p = document.createElement("p");
        p.textContent = winner;
        p.className = "comment";

        hello.appendChild(p);
      });
    }
  });
}

//CODED BY MOHIT TIWARI USING THIS CODE ANYWHERE ELSE WITHOUT MY PERMISSON IS STRICTLY PROHIBITED!!!!!

function writeComment(comment) {
  const commentsRef = ref(database, "/comments");
  get(commentsRef)
    .then((snapshot) => {
      const data = snapshot.val() || {};
      const newKey = `comment${Object.keys(data).length + 1}`;

      const updates = {};
      updates[newKey] = comment;

      set(commentsRef, { ...data, ...updates })
        .then(() => {})
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
      Object.values(data).forEach((comment) => {
        const p = document.createElement("p");
        p.textContent = comment;
        p.className = "comment";
        hello.appendChild(p);
      });
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

  button.style.position = "absolute";
  button.style.left = `${randomX}px`;
  button.style.top = `${randomY}px`;
});

button1.addEventListener("click", () => {
  alert("You clicked me!");
  writeWinnerData(username);
});

commentText.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    writeComment(commentText.value);
    commentText.value = "";
  }
});
