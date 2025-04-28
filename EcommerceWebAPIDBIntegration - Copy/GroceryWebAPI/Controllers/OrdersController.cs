using System;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using GroceryWebAPI.Models;

namespace GroceryWebAPI.Controllers
{
    [ApiController]
    [Route("api/orderscontroller/")]
    public class OrdersController : ControllerBase
    {
        private readonly ApplicationDBContext _dbContext;
        public OrdersController(ApplicationDBContext _db)
        {
            _dbContext = _db;
        }
        [HttpGet("orders")]
        public IActionResult GetOrders()
        {
            
            return Ok(_dbContext.orders);

        }

        //getting the order
        [HttpGet("get/order/{orderID}")]
        public IActionResult GetOrderDetail(int orderID)
        {
            var order = _dbContext.orders.Find(orderID);
            if (order == null)
            {
                return NotFound();
            }
            return Ok(order);
        }

        //Adding new product
        [HttpPost("add/newOrder/{userID}/{productID}/{quantity}")]
        public IActionResult AddNewProducts(int userID, int productID, int quantity)
        {
            var product = _dbContext.products.Find(productID);
            if (product == null)
            {
                Console.WriteLine("Product not found");
                return NotFound();
            }
            if (product.ProductCount < quantity)
            {
                Console.WriteLine("Not enough quantity available");
                return BadRequest("Not enough quantity available");
            }

            var user = _dbContext.users.Find(userID);
            if (user == null)
            {
                Console.WriteLine("User not found");
                return BadRequest("User not found");
            }
            double totalPrice = product.ProductPrice * quantity;
            if (user.Amount < totalPrice)
            {
                Console.WriteLine("Not enough balance");
                return BadRequest("Not enough balance");
            }
            user.Amount -= totalPrice;
            product.ProductCount -= quantity;
            Order order = new Order() { ProductID = productID, ProductName = product.ProductName, UserID = userID, TotalPrice = totalPrice, ProductCount = quantity, PurchaseStatus = ApplicationDBContext.orderStatus[0], OrderDate = DateTime.Now };
            _dbContext.orders.Add(order);
            _dbContext.SaveChanges();
            return Ok(order.OrderID);
        }

        [HttpPut("cancel/{userID}/{orderID}")]
        public IActionResult CancelOrder(int userID, int orderID)
        {
            var order = _dbContext.orders.FirstOrDefault(order => order.OrderID == orderID && order.UserID == userID);
            if (order == null)
            {
                return NotFound();
            }
            if (order.PurchaseStatus == ApplicationDBContext.orderStatus[1])
            {
                return BadRequest("Order already cancelled");
            }
            order.PurchaseStatus = ApplicationDBContext.orderStatus[1];
            var user = _dbContext.users.Find(userID);
            user.Amount += order.TotalPrice;
            _dbContext.SaveChanges();
            return Ok();
        }
    }
}