let myLibrary = [];
let numOfBooks = 0;
let currentBookIndex = null;
let table = document.getElementsByTagName("table")[0];
let newBookBtn = document.getElementsByClassName("add-book-btn")[0];
let submitBtn = document.getElementById('form-submit-btn');
newBookBtn.addEventListener('click', openForm);
let form = document.getElementsByTagName("form")[0];
let completedLabel = form.elements["completed"];
completedLabel.addEventListener('click', checkboxLabel);



//Create a new book

function Book(author, title, pages, completed, numOfBooks) {
    this.author = author;
    this.title = title;
    this.pages = pages;
    this.completed = completed;
    this.numOfBooks = numOfBooks;
}

function updateLibrary() {
    let title = form.elements["title"].value;
    let author = form.elements["author"].value;
    let pages = form.elements["pages"].value;
    let completed = form.elements["completed"].checked == true ? "✔" : "❌";
    //adding new book
    if (submitBtn.innerText != "Update") {
        numOfBooks++;
        let row = table.insertRow(numOfBooks);
        let removeButton = document.createElement("button");
        let editButton = document.createElement("button");
        removeButton.className = "remove-button";
        removeButton.innerText = "X";
        editButton.className = "edit-button";
        editButton.innerText = "Edit";
        editButton.addEventListener("click", editBook);
        addRemoveListener(removeButton);
        row.insertCell(0).textContent = title;
        row.insertCell(1).textContent = author;
        row.insertCell(2).textContent = pages;
        row.insertCell(3).innerText = completed
        let bookNumber = row.rowIndex;
        myLibrary.push(new Book(author, title, pages, completed, bookNumber));
        row.lastChild.value = bookNumber;
        let buttonCell = row.insertCell(4);
        buttonCell.className = "button-cell";
        buttonCell.appendChild(removeButton);
        buttonCell.appendChild(editButton);
    }
    //updating book
    else {
        myLibrary[currentBookIndex - 1].title = title;
        myLibrary[currentBookIndex - 1].author = author;
        myLibrary[currentBookIndex - 1].pages = pages;
        myLibrary[currentBookIndex - 1].completed = completed;
        table.rows[currentBookIndex].cells[0].innerText = title;
        table.rows[currentBookIndex].cells[1].innerText = author;
        table.rows[currentBookIndex].cells[2].innerText = pages;
        table.rows[currentBookIndex].cells[3].innerText = completed;
    }
    closeForm();
}



function openForm() {
    document.getElementById("myForm").style.display = "flex";
    newBookBtn.style.display = "none";
    document.getElementsByClassName('main-area')[0].style.opacity = "0.5";
}

function addRemoveListener(btn) {
    btn.addEventListener("click", removeBook);
}


function removeBook() {
    table.deleteRow(this.parentElement.parentElement.rowIndex);
    myLibrary.splice(this.parentElement.parentElement.rowIndex - 1, 1);
    numOfBooks--;
}

function changeCompeletedState() {
    if (myLibrary[this.parentElement.rowIndex - 1].completed == "✔") {
        this.innerText = "❌";
        myLibrary[this.parentElement.rowIndex - 1].completed = "❌";
    }
    else {
        this.innerText = "✔";
        myLibrary[this.parentElement.rowIndex - 1].completed = "✔";
    }

}

function editBook() {
    submitBtn.innerText = "Update";
    currentBookIndex = this.parentElement.parentElement.rowIndex;
    fillForm(currentBookIndex);
    openForm();
}

function fillForm(index) {
    let textFields = document.getElementsByTagName("input");
    for (i = 0; i < textFields.length; i++) {
        if (textFields[i].type == "text")
            textFields[i].value = table.rows[index].cells[i].innerText;
        else if (textFields[i].type == "checkbox") {
            if (table.rows[index].cells[i].innerText == "✔")
                form.elements["completed"].checked = true;
            else form.elements["completed"].checked = false;
        }

    }
}


    function closeForm() {
        if (submitBtn.innerText = "Update")
            submitBtn.innerText = "Add Book";
        clearForm();
        document.getElementById("myForm").style.display = "none";
        newBookBtn.style.display = "flex";
        document.getElementsByClassName('main-area')[0].style.opacity = "1";
    }

    function checkboxLabel() {
        if (completedLabel.checked == true) {
            document.getElementById("checkboxlabel").textContent = "Completed";
        }
        else document.getElementById("checkboxlabel").textContent = "Not Completed";
    }

    function clearForm() {
        let textFields = document.getElementsByTagName("input");
        for (i = 0; i < textFields.length; i++) {
            if (textFields[i].type == "text")
                textFields[i].value = "";
        }
    }



