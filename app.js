document.querySelector("#aboutBtn").addEventListener("click", function (e) {
  const about = document.getElementById("about");
  about.style.display = about.style.display === "none" ? "block" : "none";
});

document.querySelector("#stackBtn").addEventListener("click", function (e) {
  const stack = document.getElementById("stackBorder");
  stack.style.display = stack.style.display === "none" ? "block" : "none";
});

document.querySelector("#contactBtn").addEventListener("click", function (e) {
  const contact = document.getElementById("contact");
  contact.style.display = contact.style.display === "none" ? "block" : "none";
});

// let music = new Audio()
// music.src = "audio/joke.mp3"
// music.volume = 0.1