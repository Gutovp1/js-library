const titleInput = document.querySelector("#title");
const authorInput = document.querySelector("#author");
const pagesInput = document.querySelector("#pages");
const readInput = document.querySelector("#read");
const booksLib = document.querySelector(".bookList");
const dashboardCards = document.querySelector(".dashboard");
const bookForm = document.querySelector('.book-form');

let gofor = false;

function Book(title, author, pages, read){
    this.title = title,
    this.author = author,
    this.pages = pages,
    this.read = read;
}

Book.prototype.info = function (){
    return `${this.title.value} ${this.author.value} ${this.pages.value}  ${this.read.value}`
}

let myLibrary = [];

function addBookToLibrary(book){
    myLibrary.push(book);
    createCard(book, myLibrary);
}

function createCard(book, myLibrary){
        const newCard = document.createElement('div');
        newCard.classList.add('card');
        
        const btnRemove = document.createElement('button');
        btnRemove.classList.add('delete');
        // btnRemove.classList.add(`${index}`);
        btnRemove.textContent = "X";
        newCard.appendChild(btnRemove);

        const newTitle = document.createElement('div');
        newTitle.textContent = "Title: "+ book.title.value +"\n";
        newCard.appendChild(newTitle);

        const newAuthor = document.createElement('div');
        newAuthor.textContent = "Author: "+ book.author.value +"\n";
        newCard.appendChild(newAuthor);

        const newPages = document.createElement('div');
        newPages.textContent = "Pages: "+ book.pages.value +"\n";
        newCard.appendChild(newPages);


        const newRead = document.createElement('div');
        const readStatus = document.createElement('button');
        readStatus.classList.add('read');
        newRead.textContent = "Have read it? ";
        readStatus.textContent = book.read.value;
        newCard.appendChild(newRead);
        newCard.appendChild(readStatus);

        
        dashboardCards.appendChild(newCard);
}

//delete button in each book added
dashboardCards.addEventListener('click', e => {
    let target = e.target;
    if(target.classList.contains('delete')){
        target.parentNode.outerHTML = '';
    }
});

const btnAdd = document.querySelector("#add-book-btn");
btnAdd.addEventListener('click',(event) => {
    if(!gofor){
    //prevent the default process of submitting data to a web server and refreshing the page
    event.preventDefault();
    let NewBook = new Book(titleInput, authorInput, pagesInput, readInput);
    NewBook.prototype = Object.create(Book.prototype);
    addBookToLibrary(NewBook);
    bookForm.reset();
    bookForm.read.value = '-';
    bookForm.read.style.background = 'white';
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

function changeReadStatus(){
    let statusCard = document.querySelector(".read");
    if(statusCard.textContent == 'yes')
        statusCard.textContent = 'no';
    else
        statusCard.textContent = 'yes';
}

//change the status of read for added books
dashboardCards.addEventListener('click', e => {
    let targetBtn = e.target;
    if(targetBtn.classList.contains('read')){
        if (targetBtn.parentNode.lastChild.textContent == "yes") {
            targetBtn.parentNode.lastChild.textContent = "no";
        } else{
            targetBtn.parentNode.lastChild.textContent = "yes";
        }
        // changeReadStatus();
    }    
});
