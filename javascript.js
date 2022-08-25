const titleInput = document.querySelector("#title");
const authorInput = document.querySelector("#author");
const pagesInput = document.querySelector("#pages");
const readInput = document.querySelector("#read");
const dashboardCards = document.querySelector(".dashboard");
const bookForm = document.querySelector(".book-form");
const btnAddBook = document.querySelector("#add-book-btn");
const btnInsertBook = document.querySelector(".btn-insert-book");
const popupForm = document.querySelector(".popup");
const blurryLayer = document.querySelector(".blur");

// let myLibrary = [];

class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = Date.now();
  }

  get info() {
    return `${this.title} ${this.author} ${this.pages}  ${this.read}`;
  }
}

class Library {
  constructor() {
    this.books = [];
  }
}

let myLibrary = new Library();

function showFormPopup() {
  popupForm.classList.add("active");
  blurryLayer.classList.add("active");
}

btnInsertBook.addEventListener("click", showFormPopup);

function addBookToLibrary(book) {
  myLibrary.books.push(book);
}

function createCard(book, index, libraryArray) {
  const newCard = document.createElement("div");
  const btnRemove = document.createElement("button");
  const newTitle = document.createElement("div");
  const newAuthor = document.createElement("div");
  const newPages = document.createElement("div");
  const newRead = document.createElement("div");
  const btnRead = document.createElement("button");

  newCard.className = "card";
  btnRemove.className = "delete";
  btnRead.className = "read";
  btnRemove.setAttribute("data-id", `${book.id}`);

  btnRemove.textContent = "X";
  newTitle.textContent = "Title: " + book.title + "\n";
  newAuthor.textContent = "Author: " + book.author + "\n";
  newPages.textContent = "Pages: " + book.pages + "\n";
  newRead.textContent = "Have you read it?";
  btnRead.textContent = book.read;

  if (btnRead.textContent == "yes") btnRead.style.background = "lightgreen";
  else btnRead.style.background = "lightyellow";

  newCard.appendChild(btnRemove);
  newCard.appendChild(newTitle);
  newCard.appendChild(newAuthor);
  newCard.appendChild(newPages);
  newCard.appendChild(newRead);
  newCard.appendChild(btnRead);
  dashboardCards.appendChild(newCard);
}

function printLibrary(array) {
  dashboardCards.innerHTML = ""; //clear the dashboard beforehand
  array.forEach((element, index, arr) => createCard(element, index, arr));
  dashboardCards.lastChild.classList.remove("animate");
}

//delete button for each book added
dashboardCards.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete")) {
    e.target.parentNode.outerHTML = "";
    myLibrary.books = myLibrary.books.filter(function (book) {
      return book.id !== parseInt(e.target.dataset.id);
    });
    populateStorage();
  }
});

function validateInputs() {
  if (
    titleInput.value != "" &&
    authorInput.value != "" &&
    pagesInput.value != ""
  ) {
    return true;
  } else return false;
}

function refreshForm() {
  bookForm.reset();
  bookForm.read.value = "no";
  bookForm.read.style.background = "lightyellow";
  bookForm.title.focus();
}

btnAddBook.addEventListener("click", (event) => {
  if (validateInputs()) {
    //prevent the default process of submitting data to a web server and refreshing the page
    event.preventDefault();
    let NewBook = new Book(
      titleInput.value,
      authorInput.value,
      pagesInput.value,
      readInput.value
    );
    addBookToLibrary(NewBook);
    printLibrary(myLibrary.books);
    closePopup();
    populateStorage();
  }
});

function closePopup() {
  refreshForm();
  popupForm.classList.remove("active");
  blurryLayer.classList.remove("active");
  dashboardCards.lastChild.classList.add("animate");
}

function btnToggle() {
  let btn = document.getElementById("read");
  if (btn.value == "no") {
    btn.value = "yes";
    btn.style.background = "lightgreen";
  } else {
    btn.value = "no";
    btn.style.background = "lightyellow";
  }
}

//change the read status for added books
dashboardCards.addEventListener("click", (e) => {
  let targetBtn = e.target;
  if (targetBtn.classList.contains("read")) {
    if (targetBtn.parentNode.lastChild.textContent == "yes") {
      targetBtn.parentNode.lastChild.textContent = "no";
      targetBtn.parentNode.lastChild.style.background = "lightyellow";
      myLibrary.books[
        myLibrary.books.findIndex(
          (e) => e.id == targetBtn.parentNode.firstChild.dataset.id
        )
      ].read = "no";
    } else {
      targetBtn.parentNode.lastChild.textContent = "yes";
      targetBtn.parentNode.lastChild.style.background = "lightgreen";
      myLibrary.books[
        myLibrary.books.findIndex(
          (e) => e.id == targetBtn.parentNode.firstChild.dataset.id
        )
      ].read = "yes";
    }
    populateStorage();
  }
});

blurryLayer.addEventListener("click", closePopup);

document.addEventListener("keydown", (e) => {
  if (e.key == "Escape") closePopup();
});

//Local Storage
function populateStorage() {
  window.localStorage.setItem("library", JSON.stringify(myLibrary.books));
}

function restoreLocalStorage() {
  myLibrary.books = JSON.parse(localStorage.getItem("library"));
}

if (!localStorage.getItem("library")) {
  populateStorage();
} else {
  restoreLocalStorage();
  printLibrary(myLibrary.books);
}

// dashboardCards.onchange = populateStorage;
