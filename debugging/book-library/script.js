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
  let table = document.getElementById("display");
  let rowsNumber = table.rows.length;

  //delete old table
  for (let n = rowsNumber - 1; n > 0; n--) {
    table.deleteRow(n);
  }
  //insert updated row and cells
  for (let i = 0; i < myLibrary.length; i++) {
    const index = i;
    let row = table.insertRow(1);
    let titleCell = row.insertCell(0);
    let authorCell = row.insertCell(1);
    let pagesCell = row.insertCell(2);
    let wasReadCell = row.insertCell(3);
    let deleteCell = row.insertCell(4);

    titleCell.innerHTML = myLibrary[index].title;
    authorCell.innerHTML = myLibrary[index].author;
    pagesCell.innerHTML = myLibrary[index].pages;

    //add and wait for action for read/unread button
    let changeBut = document.createElement("button");
    changeBut.className = "btn btn-success";
    changeBut.innerText = myLibrary[index].isRead ? "Yes" : "No";
    changeBut.addEventListener("click", function () {
      myLibrary[index].isRead = !myLibrary[index].isRead;
      render();
    });
    wasReadCell.appendChild(changeBut);

    //add delete button to every row and render again
    let delButton = document.createElement("button");
    delButton.className = "btn btn-warning";
    delButton.innerHTML = "Delete";
    delButton.addEventListener("click", function () {
      alert(`You've deleted title: ${myLibrary[index].title}`);
      myLibrary.splice(index, 1);
      render();
    });
    deleteCell.appendChild(delButton);
  }
}
