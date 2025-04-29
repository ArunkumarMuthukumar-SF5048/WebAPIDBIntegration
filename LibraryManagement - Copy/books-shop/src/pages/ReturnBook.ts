import { BookAvailability, BookBorrowStatus } from "../models/model";
import * as  APICALLS from '../api/apicalls';

export async function renderReturnBook(container: HTMLElement) {
    var user = await APICALLS.isAuthenticated();
    if (!user.success) {
        alert("Please login first");
        return;
    }
    var currentUser = await APICALLS.getIndividualUser(user.email);
    if (!currentUser) {
        alert("User not found");
        return;
    }
    container.innerHTML = `<h2>Borrow Details</h2>`;
    const tableContainer = document.createElement("span");
    createTable();
    async function createTable() {
        var returBook = await APICALLS.fetchBorrows();
        tableContainer.innerHTML = "";
        const table = document.createElement("table");
        table.border = "1";
        table.style.borderCollapse = "collapse";
        table.style.width = "100%";

        var headerRow = document.createElement("tr") as HTMLTableRowElement;
        headerRow.innerHTML = `
        <th>Borrow ID</th>
        <th>User ID</th>
        <th>Book ID</th>
        <th>Borrow Date</th>
        <th>PaidFineAmount</th>
        <th>Borrow Status</th>
        <th>Action</th>`
        table.appendChild(headerRow);
        returBook.forEach((borrow) => {
            if (borrow.userID == currentUser!.userID) {
                var row = document.createElement("tr") as HTMLTableRowElement;
                row.innerHTML = `<td>${borrow.borrowID} <td>${borrow.userID}</td> 
                <td>${borrow.bookID}</td> 
                
                <td>${new Date(borrow.borrowDate).toLocaleDateString()}</td> 
                <td>${borrow.paidFineAmount}</td>
                <td>${borrow.bookBorrowStatus}</td>
                <td><button id="cancelbtn" onclick="ReturnBook('${borrow.borrowID}')">Return Book</button></td>`;
                table.appendChild(row);
            }
        })
        tableContainer.appendChild(table);
    }
    container.appendChild(tableContainer);

    async function ReturnBook(borrowID: string) {
        var confirmation = confirm("Are you sure you want to cancel this borrow?");
        if (!confirmation) {
            return;
        }
        var returingBook = await APICALLS.getIndividualBorrow(parseInt(borrowID));
        var bookCondition = confirm("Is the book Damaged?");
        if(bookCondition){
        
            var bookChanged=await APICALLS.getIndividualBook(returingBook!.bookID);
            bookChanged!.availability=BookAvailability[2];
            alert("book" +bookChanged?.bookID + bookChanged?.availability)
            await APICALLS.editBookDetail(bookChanged!);
        }
       
        if (returingBook == null) {
            alert("Borrow Object not found");
            return;
        }
        if (returingBook.bookBorrowStatus == BookBorrowStatus[1]) {
            alert("Book already Returned");
            return;
        }

        var fineAmount = 0;
        // var borrowbook = BorrowList.find((borrow) => borrow.BorrowID == borrowID);
        var book = await APICALLS.getIndividualBook(returingBook!.bookID);
        // var book=BookList.find((book)=>book.bookID==borrowbook?.bookID);
        var borrowDate = new Date(returingBook!.borrowDate);
        var borrowedDate = new Date(borrowDate);
        var endDate = new Date(borrowedDate.setDate(borrowDate.getDate() + 15));
        if (endDate < new Date) {
            var spanDays = Math.floor((new Date().getTime() - endDate.getTime()) / (1000 * 60 * 60 * 24));
            fineAmount = spanDays;

            alert(fineAmount);
        }
        var currentUser = await APICALLS.getIndividualUser(user.email);
        var bookStatus = book?.availability;
        if (bookStatus == BookAvailability[2]) {
            fineAmount += 300;
        }
        if (returingBook?.bookBorrowStatus == BookBorrowStatus[0]) {

            if (currentUser!.amount < fineAmount) {
                alert("Insufficient balance");
                return;
            }
            else {
                currentUser!.amount -= fineAmount;
                
                alert("fine "+fineAmount)
                book!.availability = BookAvailability[0];
                await APICALLS.editBookDetail(book!);

                returingBook.bookBorrowStatus = BookBorrowStatus[1];
                returingBook.paidFineAmount += fineAmount;
                alert("borrow returned successfully");
            }
        }
        // var product = ProductList.find((product) => product.productId == borrow!.productId);
        // product!.productCount += borrow!.productCount;
        // var userChange = UserArrayList.find((user1) => user1.userId == currentUser.userId);
        // userChange!.amount += borrow!.totalPrice;
        // localStorage.setItem("user", JSON.stringify(userChange));
        await APICALLS.returnBook(currentUser!.userID, parseInt(borrowID),fineAmount);


        // var Bookobj: BookDetails = {
        //     bookID: parseInt(book!.bookName),
        //     authorName: book!.authorName,
        //     availability: "Available",
        //     bookName: book!.bookName,
        // };
        
        currentUser!.amount-=fineAmount;
        alert("current user " + currentUser!.userID)
        createTable();
        if(bookChanged!.availability!="Damaged"){ 
            bookChanged!.availability=BookAvailability[2];
            await APICALLS.editBookDetail(bookChanged!);}
       
        await APICALLS.deleteBorrow(book!.bookID);
        
        // await APICALLS.editBookDetail()
        
    }
    (window as any).ReturnBook = ReturnBook;
}