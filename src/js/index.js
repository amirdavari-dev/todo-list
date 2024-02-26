const $ = document;
let addBtn = $.getElementById("addBtn");
let clearBtn = $.getElementById("clearBtn");
let inputElem = $.getElementById("todoname");
let comBtn = $.getElementById("comBtn");
let removeBtn = $.getElementById("removeBtn");
let mainContent = $.querySelector(".main_content");
let closeModal = $.getElementById("closeModal");
let clearTodos = $.getElementById("clearTodos");
let data = [];


addBtn.addEventListener("click", () => {
  addFunc(inputElem.value);
});
inputElem.addEventListener("keydown", (e) => {
  e.keyCode === 13 && addFunc(inputElem.value);
});
clearBtn.addEventListener("click", () => {
  data = [];
  setLocal(data);
  mainContent.innerHTML = "";
});
window.addEventListener("load", () => {
  data = JSON.parse(localStorage.getItem("data")) || [];
  data.forEach((item) => {
    postData(item);
  });
});
const postData = ({ title, isComplete }) => {
  mainContent.insertAdjacentHTML(
    "beforeend",
    `
    <div class="flex justify-between items-center dark:bg-rose-500 p-3 bg-white shadow-lg border rounded-xl">
            <div>
              <h1 class="font-bold text-lg titleTodo">${title}</h1>
            </div>
            <div class="flex items-center justify-end gap-x-2">
              <button onclick="completedHandler(event)"
                id="comBtn"
                class="p-2 bg-lime-600 hover:scale-75 side_effect text-white rounded-lg "
              >
                Complete
              </button>
              <button onclick="removeHandler(event)"
                id="removeBtn"
                class="p-2 bg-rose-500 side_effect rounded-lg hover:scale-75 text-white"
              >
                Remove
              </button>
            </div>
      </div>
    `
  );
};
const completedHandler = (e) => {
  let titleElem = e.target.parentElement.parentElement.children[0].children[0];
  let titleData = titleElem.innerHTML;
  if (mainContent.childElementCount) {
    data.forEach((item) => {
      if (item.title === titleData) {
        item.isComplete = item.isComplete ? false : true;
        titleElem.classList.toggle("line-through", item.isComplete);
      }
    });
    setLocal(data);
  }
};
const removeHandler = (e) => {
  let titleData =
    e.target.parentElement.parentElement.children[0].children[0].innerHTML;
  data = data.filter((item) => {
    return item.title !== titleData;
  });
  setLocal(data);

  e.target.parentElement.parentElement.remove();
};
const setLocal = (data) => {
  localStorage.setItem("data", JSON.stringify(data));
};
const setData = (newTodo) => {
  data.push(newTodo);
};
const addFunc = (inpVal) => {
  let newTodo = {
    title: inpVal,
    isComplete: false,
  };
  postData(newTodo);
  setData(newTodo);
  setLocal(data);
  inputElem.value = "";
};
let darkBtn = $.getElementById("darkBtn");
let iconDark = $.querySelector('.iconDark')
let darkBool = false;
darkBtn.addEventListener("click", (e) => {

  if (darkBool) {
    document.documentElement.setAttribute("class", "");
    darkBool = false;
    iconDark.src = "./src/assets/moon-fill.svg"
  } else {
    document.documentElement.setAttribute("class", "dark");
    darkBool = true;
    iconDark.src = "./src/assets/brightness-high.svg"
  
  }
});
