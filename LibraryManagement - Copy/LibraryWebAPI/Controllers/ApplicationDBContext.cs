using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using LibraryAPI.Models;
using Microsoft.EntityFrameworkCore;


namespace LibraryAPI.Controllers
{
    public class ApplicationDBContext: DbContext
    {
        public ApplicationDBContext(DbContextOptions <ApplicationDBContext> options) : base(options)
        {
            AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);

            
        }
        public DbSet<User> users { get; set; }
        public DbSet<BookDetails> books{get;set;}
        public DbSet<BorrowDetails> borrows { get; set; }
        // public static List<User> users = new List<User>()
        // {
        //     new User() { UserID = 1, Name = "Ravi", Email = "ravi@gmail.com",  Password = "Ravi@1", Amount = 1000, UserPhoneNumber = "9876543210" }
        // };

        public static List<string> BookAvailability=new List<string>(){"Available","Issued","Damaged"};
        public static List<string> BookBorrowStatus = new List<string>(){"Borrowed", "Returned"};

        // public static List<BookDetails> books = new List<BookDetails>()
        // {
        //     new BookDetails() { BookID = 1, BookName = "C#", AuthorName="Author1",Availability=BookAvailability[1]},
        //     new BookDetails() { BookID = 2, BookName = "C#",AuthorName="Author2",Availability=BookAvailability[1]},
        //     new BookDetails() { BookID = 3, BookName = "C#", AuthorName="Author1",Availability=BookAvailability[2] },
        //     new BookDetails() { BookID = 4, BookName = "HTML",  AuthorName="Author1",Availability=BookAvailability[0]},
        //     new BookDetails() { BookID = 5, BookName = "HTML", AuthorName="Author2",Availability=BookAvailability[2]},
        //     new BookDetails() { BookID = 6, BookName = "CSS", AuthorName="Author1",Availability=BookAvailability[0]},
        //     new BookDetails() { BookID = 7, BookName = "CSS", AuthorName="Author2",Availability=BookAvailability[0]},
        //     new BookDetails() { BookID = 8, BookName = "JS", AuthorName="Author1",Availability=BookAvailability[0]},
        //     new BookDetails() { BookID = 9, BookName = "JS", AuthorName="Author2",Availability=BookAvailability[1]},
        //     new BookDetails() { BookID = 10, BookName = "TS", AuthorName="Author2",Availability=BookAvailability[0]},
        //     new BookDetails() { BookID = 11, BookName = "TS", AuthorName="Author1",Availability=BookAvailability[2]},
        //     new BookDetails() { BookID = 12, BookName = "TS", AuthorName="Author2",Availability=BookAvailability[0]}
        // };

        // public static List<BorrowDetails> borrows = new List<BorrowDetails>(){
        //     new BorrowDetails() { BorrowID = 1, BookID = 1, UserID = 1, BookBorrowStatus=BookBorrowStatus[0], BorrowDate  = new DateTime(2025, 04, 07) },
        //     new BorrowDetails() { BorrowID = 2, BookID = 2, UserID = 2, BookBorrowStatus =BookBorrowStatus[0], BorrowDate = new DateTime(2023, 10, 16) },
        //     new BorrowDetails() { BorrowID = 3, BookID = 6, UserID = 2, BookBorrowStatus =BookBorrowStatus[1], BorrowDate = new DateTime(2023, 10, 16) },
        //     new BorrowDetails() { BorrowID = 4, BookID = 9, UserID = 1, BookBorrowStatus =BookBorrowStatus[0], BorrowDate = new DateTime(2023, 10, 16) },
        //     new BorrowDetails() { BorrowID = 5, BookID = 3, UserID = 2, BookBorrowStatus =BookBorrowStatus[1], BorrowDate = new DateTime(2023, 10, 16) },

        // };

        // internal static void SaveChanges()
        // {
        //     throw new NotImplementedException();
        // }
    }
}