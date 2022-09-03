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


// add books after submitting form

submitButton.addEventListener('click', (e) => {
    e.preventDefault();
    getFormInput();

    if (isValid) {
        addBookToLibrary();
        resetForm();
        closeModal(modal);
    }
})