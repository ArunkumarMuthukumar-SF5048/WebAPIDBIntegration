// let UserIdAutoIncrement=1000;
// let BookIdIncrement=100;
// let BorrowIdAutoIncrement=2000;

// export class User{
//     userId:string="UID" +UserIdAutoIncrement++;
//     amount:number=0;
//     constructor(public name:string,public gender:GenderDetails,public department:DepartmentDetails,public email:string,public password:string,public userPhoneNumber:string){
//         this.userId="UID"+UserIdAutoIncrement++;
//     }
// }

export const DepartmentDetails: string[]=["CSE","EEE","ECE"];

// export enum BookAvailability{
//     unknown='Unknown',
//     available='Available',
//     issued='Issued',
//     damaged='Damaged'
// }
export const BookAvailability: string[] = ["Available", "Issued","Damaged"];

// export class BookDetails{
//     BookId:string;
//     BookName:string;
//     AuthorName:string;
//     Availability:BookAvailability;
    
//     constructor(BookName:string,AuthorName:string,Availability:BookAvailability){
//         this.BookId="BID" + BookIdIncrement++;
//         this.BookName=BookName;
//         this.AuthorName=AuthorName;
//         this.Availability=Availability;
        
//     }
// }

// export enum BookingStatus{
//     default='Default',
//     borrowed='Borrowed',
//     returned='Returned'
// }
// export class BorrowDetails{
//     BorrowID:string;
//     BookId:string;
//     userID:string;
//     BorrowDate:Date;
//     PaidFineAmount:number;
//     BookBorrowStatus:BookingStatus;
    
//     constructor(BookId:string,userId:string,BorrowDate:Date,PaidFineAmount:number,BookBorrowStatus:BookingStatus){
//         this.BorrowID="BRID"+BorrowIdAutoIncrement++;
//         this.BookId=BookId;
//         this.userID=userId;
//         this.BorrowDate=BorrowDate;
//         this.PaidFineAmount=PaidFineAmount;
//         this.BookBorrowStatus=BookBorrowStatus;
//     }
// }


export interface BookDetails{
    bookID:number;
    bookName:string;
    authorName:string;
    availability:string;
}
export interface BorrowDetails{
    borrowID:number;
    bookID:number;
    bookName:string;
    userID:number;
    borrowDate:Date;
    paidFineAmount:number;
    bookBorrowStatus:string;
}
export const BookBorrowStatus: string[] = ["Borrowed", "Returned"];
export interface User {
    userID: number;
    amount: number;
    name: string;
    email: string;
    password: string;
    userPhoneNumber: string;
}
