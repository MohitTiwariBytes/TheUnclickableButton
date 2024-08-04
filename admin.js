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

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase();

const pass = document.getElementById("password");
const btn = document.getElementById("checkpass");

btn.addEventListener("click", () => {
  if (pass.value == "dapa26ea") {
  }
});
