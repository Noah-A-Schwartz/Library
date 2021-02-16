let myLibrary = [];
let numOfBooks = 1;
let table = document.getElementsByTagName("table")[0];
newBookBtn = document.getElementsByClassName("add-book-btn")[0];
newBookBtn.addEventListener('click', openForm);
let form = document.getElementsByTagName("form")[0];
let completed =form.elements["completed"];
completed.addEventListener('click', checkboxLabel);
   


//Create a new book

function Book(author, title, pages, completed, numOfBooks){
    this.author = author;
    this.title = title;
    this.pages = pages;
    this.completed = completed;
    this.numOfBooks = numOfBooks;
}

function addBookToLibrary(){
    let bookNumber = numOfBooks;
    let title = form.elements["title"].value;
    let author = form.elements["author"].value;
    let pages = form.elements["pages"].value;
    let completed =form.elements["completed"].checked == true ? "green" : "red";
    myLibrary.push(new Book(author, title, pages, completed, bookNumber));
    let row = table.insertRow(numOfBooks);
    row.insertCell(0).textContent = title;
    row.insertCell(1).textContent = author;
    row.insertCell(2).textContent = pages;
    row.insertCell(3).style.background = completed;
    closeForm();
}



function openForm(){
    document.getElementById("myForm").style.display = "flex";
    newBookBtn.style.display = "none";
}

function closeForm() {
    document.getElementById("myForm").style.display = "none";
    newBookBtn.style.display = "flex";
  }

function checkboxLabel(){
    if (completed.checked == true){
        document.getElementById("checkboxlabel").textContent = "Completed";
    }
    else  document.getElementById("checkboxlabel").textContent = "Not Completed";
}



