let myLibrary = [];

window.addEventListener("load", function () {
  populateStorage();

  const form = document.getElementById("bookForm");
  form.addEventListener("submit", submit);
});

function populateStorage() {
  if (myLibrary.length === 0) {
    let book1 = new Book("Robinson Crusoe", "Daniel Defoe", 252, true);
    let book2 = new Book(
      "The Old Man and the Sea",
      "Ernest Hemingway",
      127,
      true
    );
    myLibrary.push(book1, book2);
    render();
  }
}

// Book constructor
function Book(title, author, pages, isRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
}

// Submit handler
function submit(event) {
  event.preventDefault();

  const title = document.getElementById("title").value.trim();
  const author = document.getElementById("author").value.trim();
  const pages = document.getElementById("pages").value.trim();
  const check = document.getElementById("check").checked;

  if (!title || !author || !pages) {
    alert("Please fill all fields!");
    return;
  }

  let book = new Book(title, author, Number(pages), check);
  myLibrary.push(book);

  document.getElementById("bookForm").reset();
  render();
}

// Render table
function render() {
  const tableBody = document.querySelector("#display tbody");
  tableBody.innerHTML = "";

  myLibrary.forEach((book, index) => {
    let row = tableBody.insertRow();

    row.insertCell(0).textContent = book.title;
    row.insertCell(1).textContent = book.author;
    row.insertCell(2).textContent = book.pages;

    // Read toggle button
    let readCell = row.insertCell(3);
    let readBtn = document.createElement("button");
    readBtn.className = "btn btn-success btn-sm";
    readBtn.textContent = book.isRead ? "Yes" : "No";
    readBtn.addEventListener("click", () => {
      book.isRead = !book.isRead;
      render();
    });
    readCell.appendChild(readBtn);

    // Delete button
    let delCell = row.insertCell(4);
    let delBtn = document.createElement("button");
    delBtn.className = "btn btn-warning btn-sm";
    delBtn.textContent = "Delete";
    delBtn.addEventListener("click", () => {
      if (confirm(`Delete "${book.title}"?`)) {
        myLibrary.splice(index, 1);
        render();
      }
    });
    delCell.appendChild(delBtn);
  });
}
