import { BookDetails } from '../models/model';
import * as APICALLS from '../api/apicalls';

export function renderBooks(container: HTMLElement) {
    container.innerHTML = `<h2>Books</h2> <button id="addBookBtn">Add Book</button>`;
    const tableContainer = document.createElement("span");
    createTable();
    async function createTable() {
        var books = await APICALLS.fetchBooks();
        tableContainer.innerHTML = "";
        const table = document.createElement("table");
        table.border = "1";
        table.style.borderCollapse = "collapse";
        table.style.width = "100%";

        const headerRow = document.createElement("tr");
        headerRow.innerHTML = `
            <th>Book Id</th>
            <th>Book Name</th>
            <th>Author Name</th>
            <th>Availability</th>
            <th>Action</th>`;
        table.appendChild(headerRow);

        books.forEach((Book) => {
            const row = document.createElement("tr");
            row.innerHTML = `
      <td>${Book.bookID}</td>
      <td>${Book.bookName}</td>
      <td>${Book.authorName}</td>
      <td>${Book.availability}</td>
      
      <td>
        <button onclick="editBook('${Book.bookID}')">Edit</button>
        <button onclick="deleteBook('${Book.bookID}')">Delete</button>
      </td>`;
            table.appendChild(row);
        });

        tableContainer.appendChild(table);
        container.appendChild(tableContainer);
    }
    function addEditBookForm() {
        const existingForm = document.getElementById("bookForm");
        if (existingForm) {
            existingForm.remove();
        }
        const form = document.createElement("form");
        form.id = "bookForm";
        form.innerHTML = `
        <label for="BookName">Book Name:</label>
        <input type="text" id="BookName" name="BookName"><br>
        <label for="AuthorName">Author Name:</label>
        <input type="text" id="AuthorName" name="AuthorName"><br>
        <label for="BookAvailability">Book Availability:</label>
        <select id="BookAvailability" name="BookAvailability">
        <option value="Available">Available</option>
        <option value="Issued">Issued</option>
        <option value="Damaged">Damaged</option>
        <option value="Unknown">Unknown</option></select><br>
        <button class="btn" type="submit">Save</button>
        `;
        container.appendChild(form);
    }

    // Attach listeners AFTER table is in the DOM
    let editingID: number = 0;
    async function editBook(id: string) {
        // alert("Editing " + id);
        addEditBookForm();
        // Populate form with existing data for editing
        const form = document.getElementById("bookForm") as HTMLFormElement;
        const Book = await APICALLS.getIndividualBook(parseInt(id));
        if (Book) {
            editingID = Number(id);
            form.BookName.value = Book.bookName;
            form.AuthorName.value = Book.authorName.toString();
            form.BookAvailability.value = Book.availability.toString();

        }
    }

    document.addEventListener("submit", async (event) => {
        event.preventDefault();
        const form = event.target as HTMLFormElement;
        // const index = BookList.findIndex((val) => val.bookID == editingID);
        if (editingID > 0) {
            const Book: BookDetails = {
                bookID: editingID,
                bookName: form.BookName.value,
                authorName: form.AuthorName.value,
                availability: form.BookAvailability.value,

            };
            await APICALLS.editBookDetail(Book);
            alert("Updated Book successfully : " + Book.bookID);
        } else {
            // const Book: BookDetails = new BookDetails( form.BookName.value, form.AuthorName.value,form.BookAvailability.value);
            // BookList.push(Book);
            const Book: BookDetails = {
                bookID: 0, bookName: form.BookName.value, authorName: form.AuthorName.value, availability: form.BookAvailability.value,
            }
            await APICALLS.addNewBook(Book);
            alert("Added Book successfully ") ;
        }
        createTable();
        form.reset();
        editingID = 0;
        const existingForm = document.getElementById("bookForm");
        if (existingForm) {
            existingForm.remove();
        }
    });

    const addBtn = container.querySelector("#addBookBtn") as HTMLButtonElement;
    addBtn?.addEventListener("click", () => {
        alert("Add Book");
        addEditBookForm(); // make sure this function exists and is imported
    });

    async function deleteBook(id: string) {
        // var index = BookList.findIndex((val) => val.bookID == id);
        // BookList.splice(index, 1);
        await APICALLS.deleteBookDetail(parseInt(id));
        alert("Deleted " + id);
        createTable();
    }
    // Expose to window object
    (window as any).editBook = editBook;
    (window as any).deleteBook = deleteBook;
}