// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-analytics.js";
import {
  getDatabase,
  ref,
  set,
  onValue,
  get,
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-database.js";

import Filter from "https://cdn.jsdelivr.net/npm/bad-words@3.0.4/+esm";

const firebaseConfig = {
  apiKey: "AIzaSyCg-C0t2dLDwllNKktLTavrkOC56UgQREY",
  authDomain: "the-unclickable-button.firebaseapp.com",
  projectId: "the-unclickable-button",
  storageBucket: "the-unclickable-button.appspot.com",
  messagingSenderId: "414856785144",
  appId: "1:414856785144:web:bca19557552a1009a9df0d",
  measurementId: "G-LS39WJB6Q5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase();

const filter = new Filter();
let isCursorOnButtonBol = false;

const button = document.getElementById("button");
const xyzos = document.getElementById("xyzos");
const middle = document.getElementById("middle");
const commentText = document.getElementById("commentText");
const right = document.getElementById("right");
const comments = document.getElementById("comments");

function startTheGame() {
  let username = prompt("What is your name?");

  if (username !== null && username !== "") {
    // Check if the username contains bad words
    if (filter.isProfane(username)) {
      alert("Bad words aren't allowed in usernames!");
      startTheGame(); // Prompt the user to enter a different username
      return;
    }

    function writeWinnerData(name) {
      const min = 0;
      const max = 29892329;
      const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
      const winnersRef = ref(database, "winners");
      get(winnersRef)
        .then((snapshot) => {
          const data = snapshot.val() || {};

          // Check if the winner already exists
          const isDuplicate = Object.values(data).includes(name);

          if (isDuplicate) {
            alert("This winner has already been added!");
            return;
          }

          const newKey = `${randomNum}`;
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
      const min = 0;
      const max = 29892329;
      const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
      const commentsRef = ref(database, "/comments");
      get(commentsRef)
        .then((snapshot) => {
          const data = snapshot.val() || {};
          const newKey = `${randomNum}`;

          const updates = {};
          updates[newKey] = filter.clean(comment); // Check if the comment has bad words before saving

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

    function isCursorOnButton(event) {
      const rect = button.getBoundingClientRect();
      if (
        event.clientX >= rect.left &&
        event.clientX <= rect.right &&
        event.clientY >= rect.top &&
        event.clientY <= rect.bottom
      ) {
        isCursorOnButtonBol = true;
      } else {
        isCursorOnButtonBol = false;
      }
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

    xyzos.addEventListener("mouseover", () => {
      const width = middle.clientWidth;
      const height = middle.clientHeight;

      const buttonWidth = xyzos.offsetWidth;
      const buttonHeight = xyzos.offsetHeight;

      const randomX = Math.floor(Math.random() * (width - buttonWidth));
      const randomY = Math.floor(Math.random() * (height - buttonHeight));

      button.style.position = "absolute";
      button.style.left = `${randomX}px`;
      button.style.top = `${randomY}px`;
    });
    xyzos.addEventListener("click", (e) => {
      isCursorOnButton(e);
      if (isCursorOnButtonBol) {
        alert("You Clicked me yay!");
        writeWinnerData(username);
      } else {
        alert("You didn't click me!");
      }
    });

    commentText.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        if (commentText.value != "") {
          writeComment(username + ": " + commentText.value);
          commentText.value = "";
        } else {
          commentText.value = "";
        }
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
  } else {
    alert("Please enter your name");
    window.location.reload();
  }
}

startTheGame();
