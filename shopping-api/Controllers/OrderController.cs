using Microsoft.AspNetCore.Mvc;
using ShoppingCartApi.Services;

namespace ShoppingCartApi.Controllers;


[ApiController]
[Route("[controller]")]
public class OrderController : ControllerBase
{
    private readonly OrderService _orderService;

    public OrderController(OrderService orderService)
    {
        _orderService = orderService;
    }


    [HttpPost]
    public async Task<IActionResult> CreateOrder([FromBody] OrderService.CreateOrderRequest request)
    {
        var order = await _orderService.CreateOrder(request);
        return Ok(order);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetOrder(int id)
    {
        var request = new OrderService.GetOrderRequest(id);

        var order = await _orderService.GetOrder(request);
        if (order == null)

            return NotFound();

        return Ok(order);
    }

    [HttpGet]
    public IActionResult GetOrders([FromQuery] OrderService.GetOrdersRequest request)
    {

        var orders = _orderService.GetOrders(request);
        return Ok(orders);
    }

    [HttpPatch(
        "pay"
    )]
    public async Task<IActionResult> PayOrder([FromBody] OrderService.PayOrderRequest request)
    {
        try
        {
            var order = await _orderService.PayOrder(request);
            return Ok(order);
        }
        catch (System.Exception)
        {

            return new BadRequestResult();
        }

    }

    [HttpPatch("cancel")]
    public async Task<IActionResult> CancelOrder([FromBody] OrderService.CancelOrderRequest request)
    {
        try
        {
            var order = await _orderService.CancelOrder(request);
            return Ok(order);
        }
        catch (System.Exception)
        {

            return new BadRequestResult();
        }

    }

}