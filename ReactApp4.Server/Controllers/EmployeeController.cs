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


        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var filePath = @"C:\Users\User\source\repos\ConsoleApp54\Xakaton\reactapp4.client\src\Employee.json"; // Путь к файлу
            if (!System.IO.File.Exists(filePath))
            {
                return NotFound("Employee file not found.");
            }

            var jsonData = await System.IO.File.ReadAllTextAsync(filePath);
            var data = JsonSerializer.Deserialize<EmployeeData>(jsonData);

            if (data == null)
            {
                return NoContent(); // Если файл пустой или неверен
            }

            return Ok(data);
        }

    }
}
