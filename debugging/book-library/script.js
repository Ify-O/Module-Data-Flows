let myLibrary = [];

window.addEventListener("load", function () {
  populateStorage();

  const form = document.getElementById("bookForm");
  form.addEventListener("submit", submit);
});

function populateStorage() {
  if (myLibrary.length == 0) {
    let book1 = new Book("Robison Crusoe", "Daniel Defoe", "252", true);
    let book2 = new Book(
      "The Old Man and the Sea",
      "Ernest Hemingway",
      "127",
      true
    );
    myLibrary.push(book1);
    myLibrary.push(book2);
    render();
  }
}

const title = document.getElementById("title");
const author = document.getElementById("author");
const pages = document.getElementById("pages");
const check = document.getElementById("check");

//check the right input from forms and if its ok -> add the new book (object in array)
//via Book function and start render function
function submit(event) {
  event.preventDefault(); //this will prevent the form from reloading the page and losing the data in the library array.

  if (title.value == "" || author.value == "" || pages.value == "") {
    alert("Please fill all fields!");
    return false;
  } else {
    let book = new Book(
      title.value,
      author.value,
      Number(pages.value),
      check.checked
    ); //makes the page numbering numeric instead of a string.

    myLibrary.push(book);
    title.value = "";
    author.value = "";
    pages.value = "";
    check.checked = false;
    console.log(check.checked);
    render();
  }
}

function Book(title, author, pages, isRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
}

function render() {
  const table = document.getElementById("display");
  // Clear old rows except header
  table.tBodies[0].innerHTML = "";

  myLibrary.forEach((book, index) => {
    const row = table.tBodies[0].insertRow();

    row.insertCell(0).textContent = book.title;
    row.insertCell(1).textContent = book.author;
    row.insertCell(2).textContent = book.pages;

    // Read toggle
    const readCell = row.insertCell(3);
    const readBtn = document.createElement("button");
    readBtn.className = "btn btn-success";
    readBtn.textContent = book.isRead ? "Yes" : "No";
    readBtn.addEventListener("click", () => {
      book.isRead = !book.isRead;
      render();
    });
    readCell.appendChild(readBtn);

    // Delete button
    const delCell = row.insertCell(4);
    const delBtn = document.createElement("button");
    delBtn.className = "btn btn-warning";
    delBtn.textContent = "Delete";
    delBtn.addEventListener("click", () => {
      alert(`You've deleted title: ${book.title}`);
      myLibrary.splice(index, 1);
      render();
    });
    delCell.appendChild(delBtn);
  });
}
