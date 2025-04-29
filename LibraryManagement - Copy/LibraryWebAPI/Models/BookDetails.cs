using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace LibraryAPI.Models
{
     [Table("bookdetails", Schema = "public")]
    public class BookDetails
    {
        [Key]
        public int BookID { get; set; }
        public string BookName { get; set; }
        public string AuthorName { get; set; }
        public string Availability { get; set; }
      
    }
}
