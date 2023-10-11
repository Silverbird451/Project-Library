const myLibrary = [
  {
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    pages: "310",
    status: "not red"
  },
  {
    title: "The Republic",
    author: "Plato",
    pages: "383",
    status: "red"
  }
];

const titleInput = document.getElementById("title");
const authorInput = document.getElementById("author");
const pagesInput = document.getElementById("pages");
const statusInput = document.getElementById("status");
const submitBtn = document.getElementById("submitBtn");
const booksAdded = document.getElementById("booksAdded");

const bookRows = document.querySelectorAll(".bookRow");

function Book(title, author, pages, status) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.status = status;
}

function checkInputs() {
  const titleValue = titleInput.value;
  const authorValue = authorInput.value;
  const pagesValue = pagesInput.value;
  const statusValue = statusInput.value;

  if (checkIfValidInput(titleValue, authorValue, pagesValue)) {
    addBookToLibrary(titleValue, authorValue, pagesValue, statusValue);
    addBookToPage();
  }
}

function checkIfValidInput(title, author, pages) {
  if (checkIfNumbersLetters(title) || checkIfNumbersLetters(author)) {
    alert("Invalid Title or Author Input");
    return false;
  }

  if (checkIfNumbers(pages)) {
    alert("Invalid Pages Input");
    return false;
  }

  return true;
}

function checkIfNumbersLetters(str) {
  const regex = /[^A-Za-z0-9\s]/;
  return regex.test(str);
}

function checkIfNumbers(str) {
  const regex = /^\d+$/;
  return !regex.test(str);
}

function addBookToLibrary(title, author, pages, status) {
  const newBook = new Book(title, author, pages, status);
  myLibrary.push(newBook);
}

function cleanBookRows() {
  while (booksAdded.firstChild) {
    booksAdded.removeChild(booksAdded.firstChild);
  }
}

function clearInputFields(){
  titleInput.value = '';
  authorInput.value = '';
  pagesInput.value = '';
}

function toggleStatus(bookIndex) {
  const book = myLibrary[bookIndex];
  const currentStatusCell = document.querySelector(`.bookRow.n${bookIndex} .statusCell`); // Use the correct selector

  if (currentStatusCell.classList.contains("red")) {
    currentStatusCell.classList.remove("red");
    currentStatusCell.classList.add("unred");
    book.status = "not red";
    currentStatusCell.textContent = "Not Red";
  } else {
    currentStatusCell.classList.remove("unred");
    currentStatusCell.classList.add("red");
    book.status = "red";
    currentStatusCell.textContent = "Red";
  }
}


function addBookToPage() {
  const numOfBooks = myLibrary.length;
  cleanBookRows();

  for (let i = 0; i < numOfBooks; i++) {
    const bookRow = document.createElement("div");
    bookRow.classList.add("bookRow");
    bookRow.classList.add(`n${i}`);
    booksAdded.appendChild(bookRow);

    const titleCell = document.createElement("div");
    const authorCell = document.createElement("div");
    const pagesCell = document.createElement("div");
    const statusCell = document.createElement("button");
    const deleteBtnCell = document.createElement("button");

    const currentBook = myLibrary[i];

    titleCell.textContent = currentBook.title;
    authorCell.textContent = currentBook.author;
    pagesCell.textContent = currentBook.pages;
    statusCell.textContent = currentBook.status;
    deleteBtnCell.textContent = "X";

    bookRow.appendChild(titleCell);
    bookRow.appendChild(authorCell);
    bookRow.appendChild(pagesCell);
    bookRow.appendChild(statusCell);
    bookRow.appendChild(deleteBtnCell);

    deleteBtnCell.classList.add("deleteBtn");

    statusCell.classList.add("statusCell")

    if (myLibrary[i].status === "red") {
      statusCell.classList.add("red");
    } else {
      statusCell.classList.add("unred");
    }

    deleteBtnCell.addEventListener("click", function() {
      const parentRow = this.parentElement;
      parentRow.remove();

      myLibrary.splice(i, 1);
      addBookToPage(); 
    });

    statusCell.addEventListener("click", function() {
      toggleStatus(i);
    });

  }
  clearInputFields()
}

submitBtn.addEventListener("click", checkInputs);

addBookToPage()