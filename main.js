// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-analytics.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD3GsDpEhDGxT5t1Pp5Xv9Q8pSCZdptaLY",
  authDomain: "theunclickablebutton.firebaseapp.com",
  projectId: "theunclickablebutton",
  storageBucket: "theunclickablebutton.appspot.com",
  messagingSenderId: "622641247499",
  appId: "1:622641247499:web:b4c966abc89cbe0a52de0e",
  measurementId: "G-EH8FXR5HGZ"
};

const button = document.getElementById("button");
const button1 = document.getElementById("btn");
const middle = document.getElementById("middle");
const comments = document.getElementById("comments")

button1.addEventListener("mouseover", () => {
  const width = middle.clientWidth; //ensure the button dont get outside the middle div
  const height = middle.clientHeight; 

  const buttonWidth = button.offsetWidth;
  const buttonHeight = button.offsetHeight;

  const randomX = Math.floor(Math.random() * (width - buttonWidth));
  const randomY = Math.floor(Math.random() * (height - buttonHeight));

});

button1.addEventListener("click", () => {
  const winnerName = prompt("You clicked me! Now enter your name to get in the winner list!");
  comments.innerHTML += `<p class="comment">${winnerName} is a winner!</p>`;

});

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
