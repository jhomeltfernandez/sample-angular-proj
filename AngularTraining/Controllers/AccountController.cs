using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using AngularTraining.Model;
using AngularTraining.Model.Dto;
using AngularTraining.Model.Entities;
using AngularTraining.Repositories;
using AngularTraining.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace AngularTraining.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly IDataRepository<User> _userRepo;
        private readonly IConfiguration _appConfiguration;
        private readonly IEmailService _emailService;

        public AccountController( IDataRepository<User> userRepo, IConfiguration appConfiguration, IEmailService emailService)
        {
            _userRepo = userRepo;
            _appConfiguration = appConfiguration;
            _emailService = emailService;
        }

        [HttpPost("authenticate")]
        public IActionResult Authenticate(AuthenticateRequest model)
        {
            User user;

            if (model.Username == "admin@admin.com" && model.Password == "admin")
            {
                user = new User() { 
                    FirstName = "Jhomel",
                    LastName = "Fernandez",
                    Email = "admin@admin.com",
                    Password = ""
                };
            }
            else
            {
                user = _userRepo.Get(s => s.Email == model.Username && s.Password == model.Password).SingleOrDefault();
            }

            if (user == null)
            {
                return BadRequest("Incorrect user name or password.");
            }

            var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("superSecretKey@345"));
            var signinCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);
            var tokeOptions = new JwtSecurityToken(
                issuer: _appConfiguration["AppSettings:APIUrl"].ToString(),
                audience: _appConfiguration["AppSettings:APIUrl"].ToString(),
                claims: new List<Claim>(),
                expires: DateTime.Now.AddMinutes(5),
                signingCredentials: signinCredentials
            );
            var tokenString = new JwtSecurityTokenHandler().WriteToken(tokeOptions);

            return Ok(new { Token = tokenString });
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(UserModel model)
        {
            try
            {
                var isEmailInUse = _userRepo.Get(s => s.Email.Equals(model.Email)).Count() > 0 ? true : false;
                if (isEmailInUse) throw new Exception("Email address was already in use.");

                var user = new User() {
                    FirstName = model.FirstName,
                    LastName = model.LastName,
                    Email = model.Email,
                    Password = model.Password
                };

                await _userRepo.InsertAsync(user);

                await _emailService.MailKitSendAsync(user.Email, "Registration", $"Your account was successfully created.");

                return Ok(new { 
                    message = "We've sent you an email about your info and credential",
                    user = model
                });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet, Authorize]
        public IActionResult GetAll()
        {
            var users = _userRepo.GetAll();
            return Ok(users);
        }
    }
}
