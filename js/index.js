
const myLibrary = [];

// Book constructor
function Book(title, author, pages, read) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

// Prototype method to change read status
Book.prototype.toggleReadStatus = function() {
    this.read = !this.read;
};

// Add a book to the library
function addBookToLibrary(title, author, pages, read) {
    const newBook = new Book(title, author, pages, read);

    myLibrary.push(newBook);

    displayBooks();
}

// Display all books
function displayBooks() {
    const bookList = document.querySelector("#book-list");

    // Clear existing book cards
    bookList.innerHTML = "";

    // Loop through the library array
    myLibrary.forEach((book) => {
        const bookCard = document.createElement("div");
        bookCard.classList.add("book-card");

        // Connect this card to its book using the ID
        bookCard.dataset.id = book.id;

        const title = document.createElement("h3");
        title.textContent = book.title;

        const author = document.createElement("p");
        author.textContent = `Author: ${book.author}`;

        const pages = document.createElement("p");
        pages.textContent = `Pages: ${book.pages}`;

        const status = document.createElement("p");
        status.textContent = book.read ? "Read" : "Not read yet";
        status.classList.add(book.read ? "read-status" : "unread-status");

        // Change read status button
        const readButton = document.createElement("button");
        readButton.textContent = "Change Read Status";
        readButton.classList.add("read-btn");

        readButton.addEventListener("click", () => {
            book.toggleReadStatus();
            displayBooks();
        });

        // Remove book button
        const removeButton = document.createElement("button");
        removeButton.textContent = "Remove Book";
        removeButton.classList.add("remove-btn");

        removeButton.addEventListener("click", () => {
            removeBook(bookCard.dataset.id);
        });

        // Add elements to the book card
        bookCard.append(
            title,
            author,
            pages,
            status,
            readButton,
            removeButton
        );

        // Add the card to the page
        bookList.appendChild(bookCard);
    });
}

// Remove a book using its unique ID
function removeBook(bookId) {
    const bookIndex = myLibrary.findIndex(
        (book) => book.id === bookId
    );

    if (bookIndex !== -1) {
        myLibrary.splice(bookIndex, 1);
    }

    displayBooks();
}

// Select the dialog and form elements
const bookDialog = document.querySelector("#book-dialog");
const newBookButton = document.querySelector("#new-book-btn");
const cancelButton = document.querySelector("#cancel-btn");
const bookForm = document.querySelector("#book-form");

// Open the dialog when New Book is clicked
newBookButton.addEventListener("click", () => {
    bookDialog.showModal();
});

// Close the dialog when Cancel is clicked
cancelButton.addEventListener("click", () => {
    bookDialog.close();
});

// Handle form submission
bookForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const title = document.querySelector("#title").value.trim();
    const author = document.querySelector("#author").value.trim();
    const pages = Number(document.querySelector("#pages").value);
    const read = document.querySelector("#read").value === "true";

    addBookToLibrary(title, author, pages, read);

    // Clear the form
    bookForm.reset();

    // Close the dialog
    bookDialog.close();
});


