using System.Text;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using proyecto_inclusivo.models;
using System;
using System.Security.Claims;

namespace proyecto_inclusivo
{
    public class GenerateJWT
    {
        private IConfiguration _config { get; }

        public GenerateJWT(IConfiguration config)
        {
            _config = config;
        }

        public static string Gen(User user)
        {
            //temporal hasta poder hacer _config["Jwt]
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("Clave de Tokens Muy Segura"));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var _Header = new JwtHeader(credentials);

            var _Claims = new[] {
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(JwtRegisteredClaimNames.Email, user.Email)
        };

            var _Payload = new JwtPayload(
                issuer: "proyecto_api",
                audience: "proyecto_api",
                claims: _Claims,
                notBefore: DateTime.UtcNow,
                expires: DateTime.UtcNow.AddDays(7)
                );

            var _Token = new JwtSecurityToken(
                _Header,
                _Payload
            );

            return new JwtSecurityTokenHandler().WriteToken(_Token);
        }
    }
}