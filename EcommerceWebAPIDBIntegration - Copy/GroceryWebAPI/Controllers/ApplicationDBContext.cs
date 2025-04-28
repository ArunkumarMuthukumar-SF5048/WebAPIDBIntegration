using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GroceryWebAPI.Models;
using Microsoft.EntityFrameworkCore;
namespace GroceryWebAPI.Controllers
{
    public class ApplicationDBContext: DbContext
    {

       public ApplicationDBContext(DbContextOptions<ApplicationDBContext> options) : base(options)
        {
            AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);

            
        }
        // public static List<User> users = new List<User>()
        // {
        //     new User() { UserID = 1, Name = "Ravi", Email = "ravi@gmail.com",  Password = "Ravi@1", Amount = 1000, UserPhoneNumber = "9876543210" }

        // };
        public DbSet<User> users { get; set; }
        public DbSet<ProductInfo> products { get; set; }
        public DbSet<Order> orders { get; set; }

        public static List<string> orderStatus = new List<string>() { "Purchased", "Cancelled" };

        
        // public static List<ProductInfo> products = new List<ProductInfo>()
        // {
        //     new ProductInfo() { ProductID = 1, ProductName = "Mobile (Samsung)",  ProductPrice = 10000, ProductCount = 4 },
        //     new ProductInfo() { ProductID = 2, ProductName = "Tablet (Lenovo)",  ProductPrice = 100000, ProductCount = 40},
        //     new ProductInfo() { ProductID = 3, ProductName = "Camara",  ProductPrice = 20000, ProductCount = 40},
        //     new ProductInfo() { ProductID = 4, ProductName = "iPhone",  ProductPrice = 30000, ProductCount = 40},
        //     new ProductInfo() { ProductID = 5, ProductName = "HeadPhone (Boat)",  ProductPrice = 1000, ProductCount = 40},
        //     new ProductInfo() { ProductID = 6, ProductName = "Speakers",  ProductPrice = 20000, ProductCount = 40},
        // };

        // public static List<Order> orders = new List<Order>(){
        //     new Order() { OrderID = 1, ProductID = 1, ProductName = "Mobile (Samsung)", UserID = 1, TotalPrice = 10000, ProductCount = 4, PurchaseStatus = orderStatus[0], OrderDate=new DateTime(2025,11,13) },
        //     new Order() { OrderID = 2, ProductID = 2, ProductName = "Tablet (Lenovo)", UserID = 1, TotalPrice = 100000, ProductCount = 1, PurchaseStatus = orderStatus[0], OrderDate=new DateTime(2025, 11, 15)},
        // };




    }
}