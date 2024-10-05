using Microsoft.AspNetCore.Mvc;
using ReactApp4.Server.Models; // Замените на ваше пространство имен
using System.IO;
using System.Text.Json;
using System.Threading.Tasks;

namespace YourNamespace.Controllers // Замените на ваше пространство имен
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] EmployeeData data)
        {
            if (data == null)
            {
                return BadRequest("Invalid data.");
            }

            // Сохраняем данные в JSON-файл
            var json = JsonSerializer.Serialize(data);
            var filePath = @"C:\Users\User\source\repos\ConsoleApp54\Xakaton\reactapp4.client\src\Employee.json"; // Обновленный путь

            // Убедитесь, что директория существует
            var directory = Path.GetDirectoryName(filePath);
            if (!Directory.Exists(directory))
            {
                Directory.CreateDirectory(directory);
            }

            await System.IO.File.WriteAllTextAsync(filePath, json);

            return Ok(new { Message = "Success" });
        }
    }
}
