using System;
using System.Linq;
using System.Net;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using proyecto_inclusivo.models;
using Newtonsoft.Json;
using System.Collections.Generic;

namespace proyecto_inclusivo.Controllers
{
    [ApiController]
    [EnableCors]
    public class UserController : ControllerBase
    {

        private UserContext _db;
        public UserController(UserContext db)
        {
            _db = db;
        }

        [HttpGet]
        [Authorize]
        [Route("get")]
        public User GetUser()
        {
            return (_db.Users.FirstOrDefault());
        }

        [HttpPost]
        [Route("registro")]
        public IActionResult New([FromBody] User user)
        {
            var _user = _db.Users.FirstOrDefault(u => u.Email == user.Email);
            HandleMenu handle = new HandleMenu();
            if (_user != null)
            {
                return BadRequest();
            }
            else
            {
                user.Password = HashPassHelper.Hash(user.Password);
                user.Answ = HashPassHelper.Hash(user.Answ);
                _db.Users.Add(user);

                _db.SaveChanges();
                var User = _db.Users.FirstOrDefault(u => u.Email == user.Email);
                handle.Obtener();
                handle.Agregar(User.Id);
                Console.WriteLine("La id es: "+User.Id);
                return Ok();
            }
        }

        [HttpGet]
        [Route("{id}")]
        public Menu enviarMenu(int id)
        { 
            HandleMenu handle = new HandleMenu();
            handle.Obtener();
            Menu _menu = handle.devolverMenu(id);
            handle.GuardarCambios();
            return _menu;
            

        }

        [HttpPost]
        [Route("handlemenu")]
        public IActionResult guardarMenu([FromBody] Menu menu)
        {
            int userId = menu.userId;
            var handle = new HandleMenu();
            handle.Obtener();
            handle.Actualizar(menu);
            handle.GuardarCambios();
            return Ok();
        }

        [HttpPost]
        [Route("forgotpassword")]
        public IActionResult PasswordResetValidation([FromBody] User user)
        {
            var _user = _db.Users.FirstOrDefault(u => u.Email == user.Email);

            if (_user != null && HashPassHelper.Check(_user.Answ, user.Answ) && _user.Sec_quest == user.Sec_quest)
            {
                _user.Password = HashPassHelper.Hash(user.Password);

                _db.SaveChanges();

                return Ok();
            }

            else { return Unauthorized(); }
        }

        [HttpPost]
        [Route("login")]
        public IActionResult Login([FromBody] User user)
        {
            var _user = _db.Users.FirstOrDefault(u => u.Email == user.Email);

            if (_user != null && HashPassHelper.Check(_user.Password, user.Password))
            {
                //Generar y enviar JWT
                var tokenString = GenerateJWT.Gen(_user);

                HttpContext.Response.Headers.Add(
                    "Authorization",
                    "Bearer " + tokenString
                );

                //Generar y enviar cookie
                HttpContext.Response.Cookies.Append(

                    "SSID", // No tocar hasta solucionar verificacion
                    Guid.NewGuid().ToString(),
                    new CookieOptions
                    {
                        Expires = DateTime.Now.AddDays(1),
                        HttpOnly = false, // No tocar hasta solucionar verificacion
                        Secure = false
                    });

                return Ok();
            }

            else { return Unauthorized(); }
        }
    }
}