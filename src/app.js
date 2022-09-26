import "./css/index.css";
import "./js/utils";

const app = document.querySelector("#app");

const img = document.createElement("img");
img.src = require("./img/vue.png");
img.alt = "vue";
app.appendChild(img);

const input = document.createElement("input");
app.appendChild(input);

app.className = "container";

const ul = document.createElement("ul");
app.appendChild(ul);

console.log(process.env);
fetch("/proxy/api/users").then(async (response) => {
  const users = await response.json();

  users.forEach((user) => {
    const li = document.createElement("li");
    li.innerHTML = user.name + "-" + user.age;
    ul.appendChild(li);
  });
});
