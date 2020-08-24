using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AngularTraining.DataAccess;
using AngularTraining.Model.Entities;
using AngularTraining.Model.Dto;
using AngularTraining.Repositories;

namespace AngularTraining.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IDataRepository<User> _userRepo;

        public UsersController(AppDbContext context, IDataRepository<User> userRepo)
        {
            _context = context;
            _userRepo = userRepo;
        }

        // GET: api/Users
        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetUsers()
        {
            return await _userRepo.GetAllAsync();
        }

        // GET: api/Users/5
        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUser(int id)
        {
            var user = await _userRepo.FindAsync(id);

            if (user == null)
            {
                return NotFound();
            }

            return user;
        }

        [HttpPut("update-details/{id}")]
        public async Task<IActionResult> UpdateDetails(int id, UserDetailsModel model)
        {
            if (id != model.Id)
            {
                return BadRequest("Something went wrong. There was an inconsistency in the data.");
            }

            try
            {
                var user = await _userRepo.FindAsync(id);

                if (!user.Email.Equals(model.Email))
                {
                    var isEmailInUseByOther = _userRepo.Get(s => s.Email.Equals(model.Email) && s.Id != user.Id).Count() > 0 ? true : false;
                    if (isEmailInUseByOther) throw new Exception("Email address is already in use.");
                }

                user.FirstName = model.FirstName;
                user.LastName = model.LastName;
                user.Email = model.Email;

                await _userRepo.UpdateAsync(user);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

            return NoContent();
        }

        [HttpPut("update-password/{id}")]
        public async Task<IActionResult> UpdatePassword(int id, UpdatePasswordModel model)
        {
            if (id != model.Id)
            {
                return BadRequest("Something went wrong. There was an inconsistency in the data.");
            }

            try
            {
                var user = await _userRepo.FindAsync(id);
                user.Password = model.Password;

                await _userRepo.UpdateAsync(user);
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Users
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<User>> PostUser(UserModel model)
        {
            try
            {
                var existingUser = _userRepo.Get(s => s.Email.Equals(model.Email));
                if (existingUser.Count() > 0) throw new Exception("Email address already in use.");

                var user = new User()
                {
                    FirstName = model.FirstName,
                    LastName = model.LastName,
                    Email = model.Email,
                    Password = model.Password
                };
                await _userRepo.InsertAsync(user);

                return CreatedAtAction("GetUser", new { id = user.Id }, user);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

            
        }

        // DELETE: api/Users/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<User>> DeleteUser(int id)
        {
            var user = await _userRepo.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }
            await _userRepo.DeleteAsync(user);

            return user;
        }

        private bool UserExists(int id)
        {
            return _context.Users.Any(e => e.Id == id);
        }
    }
}
