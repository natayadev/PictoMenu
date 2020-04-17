using System;
using System.Linq;
using System.Security.Cryptography;

public class HashPassHelper
{
    private const int SaltSize = 16; // 128 bit
    private const int KeySize = 32; // 256 bit

    public static string Hash(string password)
    {
        using (var algo = new Rfc2898DeriveBytes(
            password,
            SaltSize,
            1000,
            HashAlgorithmName.SHA512))
        {
            var key = Convert.ToBase64String(algo.GetBytes(KeySize));
            var salt = Convert.ToBase64String(algo.Salt);

            return $"{key}.{salt}";
        }
    }

    public static bool Check(string hash, string password)
    {
        var parts = hash.Split(".", 2);

        var key = Convert.FromBase64String(parts[0]);
        var salt = Convert.FromBase64String(parts[1]);

        using (var algo = new Rfc2898DeriveBytes(
            password,
            salt,
            1000,
            HashAlgorithmName.SHA512
        ))
        {
            var keyToCheck = algo.GetBytes(KeySize);

            var verified = keyToCheck.SequenceEqual(key);

            return verified;
        }
    }
}