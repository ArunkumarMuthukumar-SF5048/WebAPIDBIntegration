using System;
using System.Linq;
using LibraryAPI.Models;
using Microsoft.AspNetCore.Mvc;


namespace LibraryAPI.Controllers
{
    [ApiController]
    [Route("api/library/borrowDetailscontroller")]
    public class BorrowDetailsController : ControllerBase
    {
        private readonly ApplicationDBContext _dbContext;
        public BorrowDetailsController(ApplicationDBContext _db)
        {
            _dbContext = _db;
        }
        [HttpGet("borrow")]
        public IActionResult GetBorrows()
        {
            return Ok(_dbContext.borrows);
        }

        //getting the order
        [HttpGet("get/borrow/{BorrowID}")]
        public IActionResult GetBorrowDetail(int borrowID)
        {
            var borrow = _dbContext.borrows.Find(borrowID);
            if (borrow == null)
            {
                return NotFound();
            }
            return Ok(borrow);
        }

        //Adding new book
        [HttpPost("add/newborrow/{userID}/{BookID}/")]
        public IActionResult AddNewBorrow(int userID, int bookID)

        {
            // Console.WriteLine(productID);
            // Console.WriteLine(quantity);
            // Console.WriteLine(userID);
            var book = _dbContext.books.Find(bookID);
            if (book == null)
            {
                Console.WriteLine("Book not found");
                return NotFound();
            }


            var user = _dbContext.users.FirstOrDefault(user => user.UserID == userID);
            if (user == null)
            {
                Console.WriteLine("User not found");
                return BadRequest("User not found");
            }
            BorrowDetails borrow = new BorrowDetails() { BookID = bookID, BookBorrowStatus = ApplicationDBContext.BookBorrowStatus[0], UserID = userID, BorrowDate = DateTime.Now };
            _dbContext.borrows.Add(borrow);
            _dbContext.SaveChanges();
            return Ok(borrow.BorrowID);
        }

        [HttpPut("return/{userID}/{borrowID}")]
        [HttpPut("return/{userID}/{borrowID}/{fineAmount}")]
        public IActionResult ReturnBook(int userID, int borrowID, int fineAmount)
        {
            var borrow = _dbContext.borrows.FirstOrDefault(borrow => borrow.BorrowID == borrowID && borrow.UserID == userID);
            if (borrow == null)
            {
                return NotFound();
            }
            var User = _dbContext.users.Find(userID);
            if (User.Amount < fineAmount)
            {
                Console.WriteLine("You have not enough balance");
                return BadRequest("Not enough balance");
            }
            if (borrow.BookBorrowStatus == ApplicationDBContext.BookBorrowStatus[1])
            {
                return BadRequest("book already returned");
            }
            User.Amount -= fineAmount;
            borrow.PaidFineAmount = fineAmount;
            borrow.BookBorrowStatus = ApplicationDBContext.BookBorrowStatus[1];
            _dbContext.SaveChanges();
            var user = _dbContext.users.Find(userID);

            return Ok();
        }

        [HttpDelete("delete/{BookID}")]
        public IActionResult DeleteBorrow(int BookID)
        {
            var borrow = _dbContext.borrows.Find(BookID);
            if (borrow == null)
            {
                return NotFound();
            }
            _dbContext.borrows.Remove(borrow);
            _dbContext.SaveChanges();
            return Ok();
        }

    }
}