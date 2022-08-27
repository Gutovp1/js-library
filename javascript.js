const titleInput = document.querySelector("#title");
const authorInput = document.querySelector("#author");
const yearInput = document.querySelector("#year");
const readInput = document.querySelector("#read");
const dashboardCards = document.querySelector(".dashboard");
const bookForm = document.querySelector(".book-form");
const popupForm = document.querySelector(".popup");
const btnAddBook = document.querySelector("#add-book-btn");
const btnInsertBook = document.querySelector(".btn-insert-book");
const blurryLayer = document.querySelector(".blur");
const errorMessage = document.querySelectorAll("label")[0];

// let myLibrary = [];

class Book {
  constructor(title, author, year, read) {
    this.title = title;
    this.author = author;
    this.year = year;
    this.read = read;
    this.id = Date.now();
  }

  get info() {
    return `${this.title} ${this.author} ${this.year}  ${this.read}`;
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
  const btnRead = document.createElement("input");

  newCard.className = "card";
  btnRemove.className = "delete";
  btnRead.className = "read";
  btnRead.setAttribute("type", "checkbox");
  btnRemove.setAttribute("data-id", `${book.id}`);

  btnRemove.textContent = "X";
  newTitle.textContent = "Title: " + book.title + "\n";
  newAuthor.textContent = "Author: " + book.author + "\n";
  newPages.textContent = "Reading Year: " + book.year + "\n";
  newRead.textContent = "Have you already read it?";
  btnRead.checked = book.read; //.read = .read.checked

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

dashboardCards.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete")) {
    if (confirm("Are you sure you want to delete this book?"))
      confirmDelete(e.target);
  }
});

function confirmDelete(targ) {
  targ.parentNode.outerHTML = "";
  myLibrary.books = myLibrary.books.filter(function (book) {
    return book.id !== parseInt(targ.dataset.id);
  });
  populateStorage();
}

function validateInputs() {
  //JS validation
  if (!titleInput.validity.valueMissing) {
    titleEntered = titleInput.value.trim();
    if (
      !myLibrary.books.find((book) => book.title == titleInput.value.trim())
    ) {
      errorMessage.textContent = " ";
      return true;
    }
    errorMessage.textContent = "This title alread exists.";
    return false;
  }
  errorMessage.textContent = "Please write a title.";
}

titleInput.addEventListener("input", validateInputs);

bookForm.addEventListener("submit", validateInputs);

function refreshForm() {
  bookForm.reset();
  bookForm.read.checked = true;
  bookForm.title.focus();
}

btnAddBook.addEventListener("click", (event) => {
  if (validateInputs()) {
    //prevent the default process of submitting data to a web server and refreshing the page
    event.preventDefault();
    let NewBook = new Book(
      titleInput.value,
      authorInput.value,
      yearInput.value,
      readInput.checked
    );
    console.log(NewBook);
    addBookToLibrary(NewBook);
    printLibrary(myLibrary.books);
    closePopup(NewBook);
    populateStorage();
  }
});

function closePopup(obj = {}) {
  refreshForm();
  popupForm.classList.remove("active");
  blurryLayer.classList.remove("active");
  //Animate card only when a book is added
  if (obj !== {}) dashboardCards.lastChild.classList.add("animate");
}

//change the read status for added books
dashboardCards.addEventListener("click", (e) => {
  let targetBtn = e.target;
  if (targetBtn.classList.contains("read")) {
    myLibrary.books[
      myLibrary.books.findIndex(
        (e) => e.id == targetBtn.parentNode.firstChild.dataset.id
      )
    ].read = targetBtn.parentNode.lastChild.checked;
  }
  populateStorage();
});

blurryLayer.addEventListener("click", closePopup);

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closePopup();
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
