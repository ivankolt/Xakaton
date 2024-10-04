
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("[controller]")]
public class RouteController : ControllerBase
{
    [HttpPost]
    public IActionResult GetRoute([FromBody] RouteRequest request)
    {
        // Обработка данных маршрута
        // Пример: вычисление расстояния и времени, сохранение в базе данных и т.д.
        return Ok(new { Distance = 1000, Duration = "10 мин" }); // Пример ответа
    }
}

public class RouteRequest
{
    public double[] Start { get; set; }
    public double[] End { get; set; }
}

