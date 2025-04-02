using Bookstore.API.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Linq;

namespace Bookstore.API.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class BookController : ControllerBase
    {
        private BookstoreContext _bookContext;
        public BookController(BookstoreContext temp)
        {
            _bookContext = temp;
        }

        // [HttpGet("AllBooks")]
        // public IActionResult Get()
        // {
        //     Console.WriteLine("✅ Dummy AllBooks route hit");
        //     return Ok(new { message = "AllBooks is alive — DB call disabled." });
        // }

        [HttpGet("AllBooks")]
        public IActionResult Get(int pageSize = 5, int pageNum = 1, bool sortByTitle = false, [FromQuery] List<string>? bookTypes = null)
        {
            var query = _bookContext.Books.AsQueryable();

            if (bookTypes != null && bookTypes.Any())
            {
                query = query.Where(b => bookTypes.Contains(b.Category));
            }

            HttpContext.Response.Cookies.Append("FavoriteBook", "Les Miserables", new CookieOptions
            {
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.Strict,
                Expires = DateTime.Now.AddMinutes(1),
            });



            // Apply sorting if requested
            if (sortByTitle)
            {
                query = query.OrderBy(b => b.Title);
            }

            var totalNumBooks = query.Count();

            var results = query
                .Skip((pageNum - 1) * pageSize)
                .Take(pageSize)
                .ToList();

            var response = new
            {
                Books = results,
                TotalNumBooks = totalNumBooks
            };

            return Ok(response);
        }

        [HttpGet("GetBookTypes")]
        public IActionResult GetBookTypes()
        {
            var bookTypes = _bookContext.Books
                .Select(b => b.Category)
                .Distinct()
                .ToList();

            return Ok(bookTypes);
        }

        [HttpPost("AddBook")]
        public IActionResult AddBook([FromBody] Book newBook)
        {
            _bookContext.Books.Add(newBook);
            _bookContext.SaveChanges();
            return Ok(newBook);
        }

        [HttpPut("UpdateBook/{bookID}")]
        public IActionResult UpdateBook(int bookID, [FromBody] Book updatedBook)
        {
            var existingBook = _bookContext.Books.Find(bookID);

            existingBook.Title = updatedBook.Title;
            existingBook.Author = updatedBook.Author;
            existingBook.Publisher = updatedBook.Publisher;
            existingBook.ISBN = updatedBook.ISBN;
            existingBook.Classification = updatedBook.Classification;
            existingBook.Category = updatedBook.Category;
            existingBook.PageCount = updatedBook.PageCount;
            existingBook.Price = updatedBook.Price;

            _bookContext.Books.Update(existingBook);
            _bookContext.SaveChanges();

            return Ok(existingBook);
        }

        [HttpDelete("DeleteBook/{bookID}")]
        public IActionResult DeleteBook(int bookID)
        {
            var book = _bookContext.Books.Find(bookID);

            if (book == null)
            {
                return NotFound(new { message = "Book not found" });
            }

            _bookContext.Books.Remove(book);
            _bookContext.SaveChanges();

            return NoContent();
        }
    }
}
