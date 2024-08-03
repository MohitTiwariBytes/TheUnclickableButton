const button = document.getElementById("button");
const button1 = document.getElementById("btn");

button1.addEventListener("click", () => {
  alert("You got me!");
});

button.addEventListener("mouseover", () => {
  const width = window.innerWidth;
  const height = window.innerHeight;

  const buttonWidth = button.offsetWidth;
  const buttonHeight = button.offsetHeight;

  const randomX = Math.floor(Math.random() * (width - buttonWidth));
  const randomY = Math.floor(Math.random() * (height - buttonHeight));

  button.style.position = 'absolute';
  button.style.left = `${randomX}px`;
  button.style.top = `${randomY}px`;
});
