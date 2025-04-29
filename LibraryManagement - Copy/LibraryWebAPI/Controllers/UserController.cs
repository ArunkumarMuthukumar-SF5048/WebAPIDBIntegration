using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

using LibraryAPI.Controllers;
using LibraryAPI.Models;

namespace LibraryAPI.Controllers
{
    [ApiController]
    [Route("api/library/usercontroller/")]
    public class UserController : ControllerBase
    {
         private readonly ApplicationDBContext _dbContext;
         public UserController(ApplicationDBContext _db)
    {
        _dbContext= _db;
    }
        //getting the sign in user
        [HttpGet("{email}")]
        public IActionResult GetUser(string email)
        {
            // var user = _dbContext.users.Find(email.ToLower());
            var user = _dbContext.users.FirstOrDefault(x => x.Email == email);
            if (user == null)
            {
                return NotFound();
            }
            return Ok(user);
        }

        //adding new user
        [HttpPost("newUser/{user}")]
        public IActionResult AddNewUser([FromBody] User user)
        {
            // Generate a unique customer ID by incrementing an auto-incrementing ID
            // user.UserID = ApplicationDBContext.users.Count + 1;
            _dbContext.users.Add(user);
            _dbContext.SaveChanges();
            return Ok(user.UserID); // Return the added customer to confirm
        }

        [HttpPut("recharge/{userID}/{amount}")]
        public IActionResult RechargeWalletBalance(int userID, double amount)
        {
            var user = _dbContext.users.Find(userID);
            if (user == null)
            {
                return NotFound();
            }
            user.Amount += amount;
            _dbContext.SaveChanges();
            return Ok();
        }
    }
}