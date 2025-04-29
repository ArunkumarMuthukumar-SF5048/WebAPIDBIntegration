
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace GroceryWebAPI.Models
{
     [Table("users", Schema = "public")]
    public class User
    {
        [Key]
        public int UserID { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string UserPhoneNumber { get; set; }
        public double Amount { get; set; }
    }
}