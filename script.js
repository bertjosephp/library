// display or close modal

const openModalButtons = document.querySelectorAll('[data-modal-target]');
const overlay = document.getElementById('overlay');

function openModal(modal) {
    if (modal == null) {
        return;
    }
    modal.classList.add('active');
    overlay.classList.add('active');
}

function closeModal(modal) {
    if (modal == null) {
        return;
    }
    modal.classList.remove('active');
    overlay.classList.remove('active');
}

openModalButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modal = document.querySelector(button.dataset.modalTarget);
        openModal(modal);
    })
})

overlay.addEventListener('click', () => {
    const modals = document.querySelectorAll('.modal.active');
    modals.forEach(modal => {
        closeModal(modal);
    })
})


// add books to library

const form = document.getElementById('form');
const submitButton = document.querySelector('.submit-button');

let myLibrary = [];
let newBook;
let isValid = false;

function Book(title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
}

function getFormValidity(title, author, pages) {
    if (title === '' || author === '' || (pages <= 0 || pages === '')) {
        return false;
    } else {
        return true;
    }
}

function getFormInput() {
    const bookTitle = document.getElementById('title').value;
    const bookAuthor = document.getElementById('author').value;
    const bookPages = document.getElementById('pages').value;
    const bookIsRead = document.getElementById('isRead').checked;
    isValid = getFormValidity(bookTitle, bookAuthor, bookPages);
    return new Book(bookTitle, bookAuthor, bookPages, bookIsRead);
}

function addBookToLibrary() {
    newBook = getFormInput();
    myLibrary.push(newBook);
}

function resetForm() {
    form.reset();
    isValid = false;
}


// display cards on page

const booksGrid = document.querySelector('.books-grid');

function createCard(book) {
    const bookCard = document.createElement('div');
    const cardTitle = document.createElement('div');
    const cardAuthor = document.createElement('div');
    const cardPages = document.createElement('div');
    const cardButtonsContainer = document.createElement('div');
    const cardReadStatusButton = document.createElement('button');
    const cardRemoveButton = document.createElement('button');

    cardTitle.textContent = `${book.title}`;
    cardAuthor.textContent = `${book.author}`;
    cardPages.textContent = `${book.pages} pages`;
    cardRemoveButton.textContent = 'Remove';
    
    bookCard.classList.add('book-card');
    cardTitle.classList.add('title');
    cardAuthor.classList.add('author');
    cardPages.classList.add('pages');
    cardButtonsContainer.classList.add('buttons-container');

    if (book.isRead) {
        cardReadStatusButton.textContent = 'Read';
        cardReadStatusButton.classList.add('read');
    } else {
        cardReadStatusButton.textContent = 'Unread';
        cardReadStatusButton.classList.add('unread');
    }

    // button toggles between read/unread
    cardReadStatusButton.addEventListener('click', () => {
        if (book.isRead) {
            cardReadStatusButton.textContent = 'Unread';
            cardReadStatusButton.classList.remove('read');
            cardReadStatusButton.classList.add('unread');
        } else {
            cardReadStatusButton.textContent = 'Read';
            cardReadStatusButton.classList.remove('unread');
            cardReadStatusButton.classList.add('read');
        }
        book.isRead = !book.isRead;
    })

    // button removes book from list and grid
    cardRemoveButton.addEventListener('click', () => {
        // remove book from library
        const index = myLibrary.findIndex((book) => (
            book.title === cardRemoveButton.parentNode.parentNode.children[0].textContent
            && book.author === cardRemoveButton.parentNode.parentNode.children[1].textContent
        ))
        myLibrary.splice(index, 1);
        console.log(index);

        // remove card from grid
        cardRemoveButton.parentNode.parentNode.parentNode.removeChild(cardRemoveButton.parentNode.parentNode);
    })

    bookCard.appendChild(cardTitle);
    bookCard.appendChild(cardAuthor);
    bookCard.appendChild(cardPages);
    bookCard.appendChild(cardButtonsContainer);
    cardButtonsContainer.appendChild(cardReadStatusButton);
    cardButtonsContainer.appendChild(cardRemoveButton);
    booksGrid.appendChild(bookCard);
}

function resetBooksGrid() {
    while (booksGrid.firstChild) {
        booksGrid.removeChild(booksGrid.lastChild);
    }
}

function updateBooksGrid() {
    resetBooksGrid();
    myLibrary.forEach(book => {
        createCard(book);
    })
}


// add books & display cards after submitting form

submitButton.addEventListener('click', (e) => {
    e.preventDefault();
    getFormInput();

    if (isValid) {
        addBookToLibrary();
        resetForm();
        closeModal(modal);
        updateBooksGrid();
    }
})