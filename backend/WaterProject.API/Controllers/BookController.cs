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

        [HttpGet]
        public IActionResult Get(int pageSize = 5, int pageNum = 1, bool sortByTitle = false)
        {
            var query = _bookContext.Books.AsQueryable();

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
    }
}
