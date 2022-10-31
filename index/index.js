const books = [];
const RENDER_EVENT = "render-book";
const SAVED_EVENT = "saved-book";
const STORAGE_KEY = "BOOK_APPS";

function generateId() {
  return +new Date();
}

function generateBookObject(id, title, author, year, isCompleted) {
  return {
    id,
    title,
    author,
    year,
    isCompleted,
  };
}

function findBook(bookId) {
  for (const bookItem of books) {
    if (bookItem.id === bookId) {
      return bookItem;
    }
  }
  return null;
}

function findBookIndex(bookId) {
  for (const index in books) {
    if (books[index].id === bookId) {
      return index;
    }
  }
  return -1;
}

function isStorageExist() {
  if (typeof Storage === undefined) {
    alert("Browser kamu tidak mendukung local storage");
    return false;
  }
  return true;
}

function saveData() {
  if (isStorageExist()) {
    const parsed = JSON.stringify(books);
    localStorage.setItem(STORAGE_KEY, parsed);
    document.dispatchEvent(new Event(SAVED_EVENT));
  }
}

function loadDataFromStorage() {
  const serializedData = localStorage.getItem(STORAGE_KEY);
  let data = JSON.parse(serializedData);

  if (data !== null) {
    for (const book of data) {
      books.push(book);
    }
  }

  document.dispatchEvent(new Event(RENDER_EVENT));
}

function makeBook(bookObject) {
  const { id, title, author, year, isCompleted } = bookObject;

  const textTitle = document.createElement("h2");
  textTitle.innerText = title;

  const textAuthor = document.createElement("p");
  textAuthor.innerText = "Penulis : " + author;

  const textYear = document.createElement("p");
  textYear.innerText = "Tahun : " + year;

  const container = document.createElement("div");
  container.classList.add("action");

  const textContainer = document.createElement("div");
  textContainer.classList.add("book_item");
  textContainer.append(textTitle, textAuthor, textYear, container);
  textContainer.setAttribute("id", `book-${id}`);

  if (isCompleted) {
    const uncompButton = document.createElement("button");
    uncompButton.innerText = "Belum Selesai Dibaca";
    uncompButton.classList.add("green");

    uncompButton.addEventListener("click", function () {
      undoBookFromCompleted(id);
      saveData();
    });

    const deleteButton = document.createElement("button");
    deleteButton.innerText = "Hapus";
    deleteButton.classList.add("red");

    deleteButton.addEventListener("click", function () {
      removeBookFromCompleted(id);
      saveData();
    });

    container.append(uncompButton, deleteButton);
  } else {
    const compButton = document.createElement("button");
    compButton.innerText = "Selesai Dibaca";
    compButton.classList.add("green");

    compButton.addEventListener("click", function () {
      addBookToCompleted(id);
      saveData();
    });

    const deleteButton = document.createElement("button");
    deleteButton.innerText = "Hapus";
    deleteButton.classList.add("red");

    deleteButton.addEventListener("click", function () {
      removeBookFromCompleted(id);
      saveData();
    });

    container.append(compButton, deleteButton);
  }

  return textContainer;
}

function addBook() {
  const BookTitle = document.getElementById("inputBookTitle").value;
  const BookAuthor = document.getElementById("inputBookAuthor").value;
  const BookYear = document.getElementById("inputBookYear").value;
  const BookIsComplete = document.getElementById("inputBookIsComplete");
  const generatedID = generateId();
  const bookObject = generateBookObject(generatedID, BookTitle, BookAuthor, BookYear, BookIsComplete.checked);
  books.push(bookObject);

  document.dispatchEvent(new Event(RENDER_EVENT));
  saveData();
}

function addBookToCompleted(bookId) {
  const bookTarget = findBook(bookId);

  if (bookTarget == null) return;

  bookTarget.isCompleted = true;
  document.dispatchEvent(new Event(RENDER_EVENT));
}

function removeBookFromCompleted(bookId) {
  const bookTarget = findBookIndex(bookId);

  if (bookTarget === -1) return;

  books.splice(bookTarget, 1);
  document.dispatchEvent(new Event(RENDER_EVENT));
}

function undoBookFromCompleted(bookId) {
  const bookTarget = findBook(bookId);

  if (bookTarget == null) return;

  bookTarget.isCompleted = false;
  document.dispatchEvent(new Event(RENDER_EVENT));
}

document.addEventListener("DOMContentLoaded", function () {
  const submitForm = document.getElementById("inputBook");

  submitForm.addEventListener("submit", function (event) {
    event.preventDefault();
    addBook();
  });

  if (isStorageExist()) {
    loadDataFromStorage();
  }
});

document.addEventListener(RENDER_EVENT, function () {
  const uncompletedBOOKList = document.getElementById("incompleteBookshelfList");
  uncompletedBOOKList.innerHTML = "";

  const completedBOOKList = document.getElementById("completeBookshelfList");
  completedBOOKList.innerHTML = "";

  for (const bookItem of books) {
    const bookElement = makeBook(bookItem);
    if (!bookItem.isCompleted) {
      uncompletedBOOKList.append(bookElement);
    } else {
      completedBOOKList.append(bookElement);
    }
  }
});
