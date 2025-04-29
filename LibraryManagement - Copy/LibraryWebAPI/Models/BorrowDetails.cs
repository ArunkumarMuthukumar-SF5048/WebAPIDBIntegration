using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace LibraryAPI.Models;

 [Table("borrow", Schema = "public")]
public class BorrowDetails
{
    [Key]
    public int BorrowID { get; set; }
    public int BookID { get; set; }
    
    public int UserID { get; set; }
   
    public string BookBorrowStatus { get; set; }
   
    public DateTime BorrowDate { get; set; }
    public int PaidFineAmount { get; set; }

}