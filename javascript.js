const titleInput = document.querySelector("#title");
const authorInput = document.querySelector("#author");
const pagesInput = document.querySelector("#pages");
const readInput = document.querySelector("#read");
const booksLib = document.querySelector(".bookList");
const dashboardCards = document.querySelector(".dashboard");
const bookForm = document.querySelector('.book-form');

let gofor = false;

class Book{
    constructor(title, author, pages, read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

    get info(){
        return `${this.title.value} ${this.author.value} ${this.pages.value}  ${this.read.value}`;
    }
}
let myLibrary = [];

function addBookToLibrary(book){
    myLibrary.push(book);
    createCard(book, myLibrary);
}

function createCard(book, myLibrary){
        const newCard = document.createElement('div');
        const btnRemove = document.createElement('button');
        const newTitle = document.createElement('div');
        const newAuthor = document.createElement('div');
        const newPages = document.createElement('div');
        const newRead = document.createElement('div');
        const btnRead = document.createElement('button');
        
        newCard.classList.add('card');
        btnRemove.classList.add('delete');
        btnRead.classList.add('read');
        btnRemove.setAttribute('id',`${myLibrary.length}`);
        alert(btnRemove.id);
        
        btnRemove.textContent = "X";
        newTitle.textContent = "Title: "+ book.title.value +"\n";
        newAuthor.textContent = "Author: "+ book.author.value +"\n";
        newPages.textContent = "Pages: "+ book.pages.value +"\n";
        newRead.textContent = "Have you read it?";
        btnRead.textContent = book.read.value;
        
        newCard.appendChild(btnRemove);
        newCard.appendChild(newTitle);
        newCard.appendChild(newAuthor);
        newCard.appendChild(newPages);
        newCard.appendChild(newRead);
        newCard.appendChild(btnRead);
        dashboardCards.appendChild(newCard);
}

//delete button in each book added
dashboardCards.addEventListener('click', e => {
    let target = e.target;
    if(target.classList.contains('delete')){
        target.parentNode.outerHTML = '';
    }
});

function validateInputs(){
    if(titleInput.value != "" && authorInput.value != "" && pagesInput.value != ""){
        return true;
    } else
        return false;
}

function refreshForm(){
    bookForm.reset();
    bookForm.read.value = 'no';
    bookForm.read.style.background = 'white';
}

const btnAdd = document.querySelector("#add-book-btn");
btnAdd.addEventListener('click',(event) => {
    if(validateInputs()){
        //prevent the default process of submitting data to a web server and refreshing the page
        event.preventDefault();
        let NewBook = new Book(titleInput, authorInput, pagesInput, readInput);
       // NewBook.prototype = Object.create(Book.prototype);
        addBookToLibrary(NewBook);
        refreshForm();
    }
})


function btnToggle(){
    let btn = document.getElementById("read");
    if (btn.value == "no")
    {
        btn.value = "yes";
        btn.style.background = "lightgreen";
    }
    else
    {
        btn.value = "no";
        btn.style.background = "lightsalmon";
    }
}

//change the status of read for added books
dashboardCards.addEventListener('click', e => {
    let targetBtn = e.target;
    if(targetBtn.classList.contains('read')){
        if (targetBtn.parentNode.lastChild.textContent == "yes") {
            targetBtn.parentNode.lastChild.textContent = "no";
            targetBtn.parentNode.lastChild.style.background = "lightsalmon";
        } else{
            targetBtn.parentNode.lastChild.textContent = "yes";
            targetBtn.parentNode.lastChild.style.background = "lightgreen";
        }
    }    
});
