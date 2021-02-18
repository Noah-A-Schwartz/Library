let myLibrary = [];
let numOfBooks = 0;
let table = document.getElementsByTagName("table")[0];
let newBookBtn = document.getElementsByClassName("add-book-btn")[0];
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
    numOfBooks++;
    let title = form.elements["title"].value;
    let author = form.elements["author"].value;
    let pages = form.elements["pages"].value;
    let completed =form.elements["completed"].checked == true ? "green" : "red";
    let row = table.insertRow(numOfBooks);
    let removeButton = document.createElement("button");
    removeButton.className = "remove-button"
    removeButton.innerText = "X";
    addRemoveListener(removeButton);
    row.insertCell(0).textContent = title;
    row.insertCell(1).textContent = author;
    row.insertCell(2).textContent = pages;
    row.insertCell(3).style.background = completed
    let bookNumber = row.rowIndex;
    myLibrary.push(new Book(author, title, pages, completed, bookNumber));
    row.lastChild.value = bookNumber;
    row.lastChild.addEventListener("click", changeCompeletedState);
    row.insertCell(4).appendChild(removeButton);
    row.lastChild.className = "button-cell";
    
    closeForm();
}



function openForm(){
    document.getElementById("myForm").style.display = "flex";
    newBookBtn.style.display = "none";
}

function addRemoveListener(btn){
    btn.addEventListener("click", removeBook);
}


function removeBook(){
    table.deleteRow(this.parentElement.parentElement.rowIndex);
    myLibrary.splice(this.parentElement.parentElement.rowIndex -1, 1);
    numOfBooks--;
}

function changeCompeletedState(){
    if(myLibrary[this.parentElement.rowIndex-1].completed == "green"){
        this.style.background = "red";
        myLibrary[this.parentElement.rowIndex-1].completed = "red";
    }
    else{
        this.style.background = "green";
        myLibrary[this.parentElement.rowIndex-1].completed = "green";
    }
    
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



