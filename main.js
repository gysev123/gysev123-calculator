const List = document.getElementById("list");
const newList = document.createElement("li");
const editbtn = document.getElementById("edit");
const data = localStorage.getItem("note");
const count = document.getElementById("count");
const notes = data ? JSON.parse(data) : [];
document.getElementById("agree").onclick = function () {
  addNote();
};
document.getElementById("search").onclick = function () {
  search();
};

function clear() {
  localStorage.clear();
}

function addNote() {
  const textPole = document.getElementById("text").value;
  if (textPole.length == 0) {
    return;
  }

  notes.push({
    title: textPole,
    completed: false,
    date: new Date(),
  });

  document.getElementById("text").value = "";
  editbtn.innerHTML = "";
  render();
}

function render() {
  localStorage.setItem("note", JSON.stringify(notes));
  List.innerHTML = "";
  if (notes.length == 0) {
    List.innerHTML = `<p class="warning">пусто</p>`;
  }
  for (let i = 0; i < notes.length; i++) {
    List.insertAdjacentHTML("afterbegin", createList(notes[i], i));
  }
}

function createList(note, index) {
  const now = note.date ? new Date(note.date) : new Date();
  if (!isNaN(now.getTime())) {
    now.setMilliseconds(0);
  } else {
    now = new Date();
  }

  let hours = now.getHours().toString().padStart(2, "0");
  let minutes = now.getMinutes().toString().padStart(2, "0");
  let day = now.getDate();
  let monthIndex = now.getMonth();
  let year = now.getFullYear();

  const months = [
    "января",
    "февраля",
    "марта",
    "апреля",
    "мая",
    "июня",
    "июля",
    "августа",
    "сентября",
    "октября",
    "ноября",
    "декабря",
  ];
  let monthName = months[monthIndex];

  if (day % 10 === 1 && day !== 11) {
    day += "-го";
  } else if ([2, 3, 4].includes(day % 10) && ![12, 13, 14].includes(day)) {
    day += "-е";
  } else {
    day += "-ое";
  }

  let spanClass = note.completed ? "valueListC" : "valueList";
  let item = note.completed ? "itemtrue" : "itemfalse";

  count.textContent = `количество: ${notes.length}`;

  return `
      <li class="${item}">
        <span class="${spanClass}">${note.title}</span>
        <span class="right">
          <span class="buttonList">
            <span class="editList" data-index="${index}" data-type="edit">✏️</span>
            <span class="succesList" data-index="${index}" data-type="toggle">✅</span>
            <span class="deleteList" data-index="${index}" data-type="remove">❌</span>
          </span>
          <span class="date">${year}, ${day} ${monthName}, ${hours}:${minutes}</span>
        </span>
      </li>`;
}

function search() {
  const searchT = document.getElementById("searchT").value;
  List.innerHTML = "";
  let y = 0;
  for (let i = 0; i < notes.length; i++) {
    if (notes[i].title.toLowerCase().includes(searchT.toLowerCase())) {
      List.insertAdjacentHTML("afterbegin", createList(notes[i], i));
      y++;
    }
  }
  count.textContent = `количество: ${y}`;
  if (y == 0) {
    List.innerHTML = `<p class="warning">результатов нет</p>`;
  }
}

List.onclick = function (event) {
  if (event.target.dataset.index) {
    const index = parseInt(event.target.dataset.index);
    const type = event.target.dataset.type;

    if (type == "toggle") {
      notes[index].completed = !notes[index].completed;
    } else if (type == "remove") {
      button.style.display = "block";
      editbtn.innerHTML = "";
      notes.splice(index, 1);
      document.getElementById("text").value = "";
    } else if (type == "edit") {
      button.style.display = "none";
      editNote(index);
      document.getElementById("text").value = notes[index].title;
    }

    render();
  }
};

function editNote(index) {
  editbtn.innerHTML = `<button data-index="${index}" data-type="editBtn" class="btnEdit">отредактировать</button>
  <button data-index="${index}" data-type="editBtnClose" class="btnEditClose">Х</button>`;
}

editbtn.onclick = function (event) {
  const textPole = document.getElementById("text").value;
  if (event.target.dataset.index) {
    const index = parseInt(event.target.dataset.index);
    const type = event.target.dataset.type;

    if (type == "editBtn") {
      notes[index].title = textPole;
      editbtn.innerHTML = "";
      button.style.display = "block";
      document.getElementById("text").value = "";
    } else if (type == "editBtnClose") {
      editbtn.innerHTML = "";
      document.getElementById("text").value = "";
      button.style.display = "block";
    }
  }
  render();
};

render();
