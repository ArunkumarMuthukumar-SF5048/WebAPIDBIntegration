
import * as APICALLS from '../api/apicalls'
import { BookDetails } from '../models/model';
export function renderBorrowBook(container: HTMLElement) {
    container.innerHTML = `<h2>Borrow Books</h2> `;
    const tableContainer = document.createElement("span");
    createTable();
    async function createTable() {
        var books=await APICALLS.fetchBooks();
        tableContainer.innerHTML = "";
        const table = document.createElement("table");
        table.border = "1";
        table.style.borderCollapse = "collapse";
        table.style.width = "100%";

        var headerRow = document.createElement("tr") as HTMLTableRowElement;
        headerRow.innerHTML = `
          <th>Book Id</th>
          <th>Book Name</th>
          <th>Author Name</th>
          <th>Book Availability</th>
         
          <th>Action</th>`;
        table.appendChild(headerRow);

        books.forEach((book) => {
            if (book.availability == "Available") {
                const row = document.createElement("tr");
                row.innerHTML =
                    `<td>${book.bookID}</td>
        <td>${book.bookName}</td>
        <td>${book.authorName}</td>
        <td>${book.availability}</td>
        <td><button id="borrowBookbtn" onclick="borrowBooks('${book.bookID}')">Borrow Book</button></td>`;
                table.appendChild(row);
            }
        });
        tableContainer.appendChild(table);
    }
    container.appendChild(tableContainer);
    async function borrowBooks(bookID: number) {
        var user = await APICALLS.isAuthenticated();
        var currentUser = await APICALLS.getIndividualUser(user.email);
        // var currentUser = JSON.parse(localStorage.getItem("user")!);
        // var userChange = UserArrayList.find((user1) => user1.userId == currentUser.userId);
        const book = await APICALLS.getIndividualBook(bookID);
        if(book==null){
            alert("Book not found");
            return;
        }
        

        var count:number=0;
        var BorrowList=APICALLS.fetchBorrows();
        (await BorrowList).forEach(item => {
            if (item.userID == currentUser?.userID && item.bookBorrowStatus=="Borrowed") {
                count += 1;
            }
        }
        )
        if (count >= 3) {
            alert("You have already borrowed three books")
            return;
        }
        // else {
        //     var borrowNew = new BorrowDetails(book!.bookID, userChange!.userId, new Date(), 0, BookingStatus.borrowed);
        //     BorrowList.push(borrowNew);
        //     book!.Availability=BookAvailability.issued;
        // }
        
        
        if (!user.success) {
            alert("Please login first");
            return;
        }
       
        if(!currentUser)
        {
            alert("User not found");
            return;
        }
        alert("Successfully borrowed book")
        await APICALLS.addNewBorrow(currentUser.userID,bookID)


        // if (userChange!.amount < totalAmount) {
        //     alert("Insufficient balance");
        //     return;
        // }
        // product.productCount-=count;
        // userChange!.amount -= totalAmount;
        // localStorage.setItem("user", JSON.stringify(userChange));
        // var order = new Order( product.productId,product.productName,currentUser.userId, totalAmount, product.productCount, orderStatus.purchased,new Date(), );
        // OrderList.push(order);
        const Books: BookDetails = {
            bookID:bookID,
            bookName:book.bookName,
            authorName:book.authorName,
            availability: "Issued",

        };
        await APICALLS.editBookDetail(Books);
        // await APICALLS.editBookDetail()
        createTable();
        alert("Book Borrowed successfully");
    
}
(window as any).borrowBooks = borrowBooks;
}
