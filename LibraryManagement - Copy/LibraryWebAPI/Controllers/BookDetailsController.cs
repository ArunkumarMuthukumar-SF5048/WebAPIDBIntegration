using System.Linq;
using LibraryAPI.Models;
using Microsoft.AspNetCore.Mvc;


namespace LibraryAPI.Controllers
{
    [ApiController]
    [Route("api/library/bookdetailscontroller")]
    public class BookDetailsController : ControllerBase
    {
         private readonly ApplicationDBContext _dbContext;
        public BookDetailsController(ApplicationDBContext _db)
        {
            _dbContext = _db;
        }
        [HttpGet("books")]
        public IActionResult GetBooks()
        {
            
            return Ok(_dbContext.books);
        }

        //getting the book
        [HttpGet("get/books/{BookID}")]
        public IActionResult GetBookDetail(int BookID)
        {
            var book = _dbContext.books.Find(BookID);
            if (book == null)
            {
                return NotFound();
            }
            return Ok(book);
        }

        //Adding new book
        [HttpPost("add/newBook")]
        public IActionResult AddNewBook([FromBody] BookDetails book)
        {
            // book.BookID = ApplicationDBContext.books.Count + 1; 
            _dbContext.books.Add(book);
            _dbContext.SaveChanges();
            return Ok(book.BookID);
        }
    
        //checking if the book already exists
        [HttpGet("book/{BookName}")]
        public IActionResult GetBookExist(string BookName)
        {
            bool isProductValid = _dbContext.books.Any(book => book.BookName.ToLower() == BookName.ToLower());
            return Ok(isProductValid);
        }

        [HttpPut("new/book/edit")]
        public IActionResult EditBook(BookDetails bookData)
        {
            var book = _dbContext.books.Find(bookData.BookID);
            if (book == null)   
            {
                return NotFound();
            }
            book.BookName = bookData.BookName;
            book.AuthorName = bookData.AuthorName; 
            book.Availability = bookData.Availability; 
            _dbContext.SaveChanges();
            return Ok();
        }

        [HttpDelete("delete/{BookID}")]
        public IActionResult DeleteBook(int BookID)
        {
            var book = _dbContext.books.Find(BookID);
            if (book == null)
            {
                return NotFound();
            }
            _dbContext.books.Remove(book);
            _dbContext.SaveChanges();
            return Ok();
        }
    }
}